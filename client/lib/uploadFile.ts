export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const API_URL = process.env.NEXT_PUBLIC_ACTIONS_URL || "http://localhost:8888";
  const res = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok || !data.url) {
    throw new Error(data.error || "Upload failed");
  }

  // backend trả về "/uploads/xxx", build thành full URL
  return `${API_URL}${data.url}`;
}
