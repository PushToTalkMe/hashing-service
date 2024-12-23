"use client";
import { AuditLog } from "@shared/schemas/audit-log.interface";
import styles from "./audit-log-page.module.css";
import { useEffect, useState } from "react";

const AuditLogPage = () => {
  const [logs, setLogs] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchToLogs();
  }, []);

  const fetchToLogs = async () => {
    try {
      const response = await fetch("/api/log", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        setLogs(result.logs);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      setError("Произошла ошибка при запросе");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Аудит лог</h1>
      {loading && <p style={{ textAlign: "center" }}>Загрузка...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {logs && (
        <div className={styles.logs}>
          <div className={styles.log}>
            <h4>ID</h4>
            <h4>UserId</h4>
            <h4>Action</h4>
            <h4>Status</h4>
            <h4>AdditionalData</h4>
            <h4>CreatedAt</h4>
          </div>
          {logs.map((log: AuditLog) => (
            <div key={log.id} className={styles.log}>
              <p>{log.id}</p>
              <p>{log.userId || "N/A"}</p>
              <p>{log.action}</p>
              <p>{log.status}</p>
              <p>{log.additionalData || "N/A"}</p>
              <p>{new Date(log.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuditLogPage;
