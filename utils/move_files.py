import os
import shutil
import sys

def move_files(src_folder, dst_folder):
    if not os.path.exists(dst_folder):
        os.makedirs(dst_folder)
    for item_name in os.listdir(src_folder):
        src_item_path = os.path.join(src_folder, item_name)
        dst_item_path = os.path.join(dst_folder, item_name)
        if os.path.isfile(src_item_path):
            shutil.move(src_item_path, dst_item_path)
        elif os.path.isdir(src_item_path):
            move_files(src_item_path, dst_item_path)
    if not os.listdir(src_folder):
        os.rmdir(src_folder)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python move_files.py <source_dir> <destination_dir>")
        sys.exit(1)
    else:
        move_files(sys.argv[1], sys.argv[2])
