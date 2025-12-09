export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://localhost:4000/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok || !data.url) {
    throw new Error(data.error || "Upload failed");
  }

  // backend trả về "/uploads/xxx", build thành full URL
  return `http://localhost:4000${data.url}`;
}
