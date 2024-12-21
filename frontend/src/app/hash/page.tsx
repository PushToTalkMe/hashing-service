import { requireAuth } from "@/lib/auth-protect";

const HashPage = async () => {
  await requireAuth();

  return (
    <div>
      <h1>Хеширование строки</h1>
      <form action="/api/hash" method="POST">
        <label>
          Строка для хеширования:
          <input type="text" name="data" required />
        </label>
        <label>
          Алгоритм:
          <select name="algorithm">
            <option value="md5">MD5</option>
            <option value="sha1">SHA-1</option>
            <option value="sha256">SHA-256</option>
          </select>
        </label>
        <button type="submit">Хешировать</button>
      </form>
    </div>
  );
};

export default HashPage;
