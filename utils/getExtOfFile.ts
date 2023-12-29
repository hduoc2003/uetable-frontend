export function getExtOfFile(fileName: string): {
    ext: string;
    name: string
} {
    // Tìm vị trí của dấu chấm cuối cùng trong chuỗi
    const lastDotIndex = fileName.lastIndexOf('.');

    // Kiểm tra xem có dấu chấm hay không và nếu có thì tách tên file và ext
    let name, ext;
    if (lastDotIndex !== -1) {
        name = fileName.slice(0, lastDotIndex);
        ext = fileName.slice(lastDotIndex + 1);
    } else {
    // Nếu không có dấu chấm, coi toàn bộ chuỗi là tên file
        name = fileName;
        ext = '';
    }
    return {
        ext, name
    }
}
