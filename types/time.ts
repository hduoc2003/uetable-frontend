export function shortTime(releaseDate: Date): string {
    const diff = Date.now() - releaseDate.getTime();
    let res = '';
  if (diff < 60) {
    res = "Vừa xong";
  } else if (diff < 1000 * 60) {
    res = `${Math.floor(diff / 1000)} giây trước`;
  } else if (diff < 1000 * 60 * 60) {
    res = `${Math.floor(diff / (1000 * 60))} phút trước`;
  } else if (diff < 1000 * 60 * 60 * 24) {
    res = `${Math.floor(diff / (1000 * 60 * 60))} giờ trước`;
  } else if (diff < 1000 * 60 * 60 * 24 * 365) {
    res = `${Math.floor(diff / (1000 * 60 * 60 * 24))} ngày trước`;
  } else if (diff < 1000 * 60 * 60 * 24 * 365) {
    res = releaseDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  } else {
    res = releaseDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  return res;
}
