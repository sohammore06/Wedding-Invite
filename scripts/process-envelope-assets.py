from PIL import Image
from pathlib import Path

dest = Path(r"D:\Soham_Personal\Wedding Invite\public\media\envelope")
media = Path(r"D:\Soham_Personal\Wedding Invite\public\media")
src = Path(r"C:\Users\Sohammore\.cursor\projects\d-Soham-Personal-Wedding-Invite\assets")

mapping = {
    "Polygon_1_3.png-c4abbd76-5a46-457c-a3ac-520fa9674d88.webp": dest / "flap-top.png",
    "Polygon_2_1.png-12edfa3b-b25f-43b7-b87e-94594b210821.webp": dest / "flap-bottom.png",
    "Polygon_4.png-27a5fefd-c89c-4b77-b6c2-c68efba46d95.webp": dest / "flap-left.png",
    "Polygon_3.png-8ab0c6eb-3aab-4b95-b828-a75779b315b0.webp": dest / "flap-right.png",
    "ChatGPT_Image_Aug_3_.png-31972a73-a423-4b10-bd08-aa3f3e0c07f1.webp": media / "wax-seal.png",
}

def knock_out_black(src_path: Path, out_path: Path, threshold: int = 30) -> None:
    im = Image.open(src_path).convert("RGBA")
    pixels = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if r <= threshold and g <= threshold and b <= threshold:
                pixels[x, y] = (0, 0, 0, 0)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    im.save(out_path, "PNG")
    print(f"saved {out_path} {im.size}")

for name, out in mapping.items():
    knock_out_black(src / f"c__Users_Sohammore_AppData_Roaming_Cursor_User_workspaceStorage_ce9c3fcceb3f1a7b94e1fec1985d3832_images_{name}", out)
