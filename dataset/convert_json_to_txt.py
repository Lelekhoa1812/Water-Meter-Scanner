import json
import os

def labelme_to_yolo(labelme_dir, labels_dir, classes):
    """
    Converts LabelMe JSON annotations to YOLO format.

    Args:
        labelme_dir (str): Path to the directory containing LabelMe JSON files.
        labels_dir (str): Path to the directory to save YOLO label files.
        classes (list): List of class names corresponding to the YOLO class indices.
    """
    if not os.path.exists(labels_dir):
        os.makedirs(labels_dir)

    # Get all JSON files in the LabelMe directory
    json_files = [f for f in os.listdir(labelme_dir) if f.endswith('.json')]

    for json_file in json_files:
        with open(os.path.join(labelme_dir, json_file), 'r') as f:
            data = json.load(f)

        # Get image dimensions
        img_width = data['imageWidth']
        img_height = data['imageHeight']

        yolo_annotations = []
        for shape in data['shapes']:
            class_name = shape['label']
            if class_name not in classes:
                print(f"Warning: Class '{class_name}' not in defined classes. Skipping...")
                continue

            class_id = classes.index(class_name)

            # Extract bounding box points
            points = shape['points']
            x_min = min(p[0] for p in points)
            y_min = min(p[1] for p in points)
            x_max = max(p[0] for p in points)
            y_max = max(p[1] for p in points)

            # Convert to YOLO format (normalized)
            x_center = (x_min + x_max) / 2 / img_width
            y_center = (y_min + y_max) / 2 / img_height
            width = (x_max - x_min) / img_width
            height = (y_max - y_min) / img_height

            yolo_annotations.append(f"{class_id} {x_center:.6f} {y_center:.6f} {width:.6f} {height:.6f}")

        # Write YOLO annotations to the labels directory
        yolo_file = os.path.join(labels_dir, os.path.splitext(json_file)[0] + '.txt')
        with open(yolo_file, 'w') as f:
            f.write('\n'.join(yolo_annotations))

        print(f"Converted {json_file} to {yolo_file}")

if __name__ == "__main__":
    import sys

    # Check for required arguments
    if len(sys.argv) != 4:
        print("Usage at parent dir: python3 dataset/convert_json_to_txt.py dataset/labelme dataset/labels dataset/classes.txt")
        print("Or")
        print("Usage at current dir: python3 convert_json_to_txt.py labelme labels classes.txt")
        sys.exit(1)

    labelme_dir = sys.argv[1]
    labels_dir = sys.argv[2]

    # Load classes from the classes file
    with open(sys.argv[3], 'r') as f:
        classes = [line.strip() for line in f.readlines()]

    labelme_to_yolo(labelme_dir, labels_dir, classes)
