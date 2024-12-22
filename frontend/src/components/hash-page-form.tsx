"use client";
import { Session } from "@/interfaces/session.interface";
import { ALGORITHMS } from "@shared/algorithms";
import { useState } from "react";

const HashPageForm = ({ session }: { session: Session }) => {
  const [hash, setHash] = useState<string | null>(null);
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
    <div>
      <h1>Хеширование строки</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Строка для хеширования:
          <input type="text" name="data" required />
        </label>
        <label>
          Алгоритм:
          <select name="algorithm">
            {ALGORITHMS.map((ALGORITHM) => (
              <option value={ALGORITHM} key={ALGORITHM}>
                {ALGORITHM.toUpperCase()}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Хеширование..." : "Хешировать"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {hash && <p>Результат: {hash}</p>}
    </div>
  );
};

export default HashPageForm;
