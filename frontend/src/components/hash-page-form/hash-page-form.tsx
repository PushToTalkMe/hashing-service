"use client";
import { Session } from "@/interfaces/session.interface";
import { ALGORITHMS, Algorithm } from "@shared/algorithms";
import { useState } from "react";
import styles from "./hash-page-form.module.css";

const HashPageForm = ({ session }: { session: Session }) => {
  const [hash, setHash] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    data: string;
    algorithm: Algorithm;
  }>({
    data: "",
    algorithm: ALGORITHMS[0],
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.target as HTMLFormElement);
    const data = {
      data: formData.get("data") as string,
      algorithm: formData.get("algorithm") as string,
    };

    try {
      const response = await fetch("/api/hash", {
        method: "POST",
        body: JSON.stringify({ ...data, email: session.user.email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setHash(result.hash);
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
    <div className={styles.container}>
      <h1 className={styles.title}>Хеширование строки</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Строка для хеширования:
          <input
            className={styles.input}
            type="text"
            name="data"
            value={formData.data}
            onChange={(e) => {
              setFormData((state) => ({ ...state, data: e.target.value }));
            }}
            required
          />
        </label>
        <label className={styles.label}>
          Алгоритм:
          <select
            className={styles.select}
            name="algorithm"
            value={formData.algorithm}
            onChange={(e) =>
              setFormData((state) => ({
                ...state,
                algorithm: e.target.value as Algorithm,
              }))
            }
          >
            {ALGORITHMS.map((ALGORITHM) => (
              <option
                className={styles.option}
                value={ALGORITHM}
                key={ALGORITHM}
              >
                {ALGORITHM.toUpperCase()}
              </option>
            ))}
          </select>
        </label>
        <button
          className={styles.button}
          type="submit"
          disabled={loading || !formData.data}
        >
          {loading ? "Хеширование..." : "Хешировать"}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {hash && <p className={styles.result}>Результат: {hash}</p>}
    </div>
  );
};

export default HashPageForm;
