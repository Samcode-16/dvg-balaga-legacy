Place award recipient photos here.

Naming convention:
  {award-id}.jpg  (e.g., award-2024.jpg)

Supported formats: .jpg, .jpeg, .png, .webp

These are referenced in public/content/awards.json via the "photo" field.
Example: "/images/awards/award-2024.jpg"

Cloudinary usage (recommended for production):
  1) Full URL:
     "photo": "https://res.cloudinary.com/<cloud-name>/image/upload/f_auto,q_auto/awards/award-2024.jpg"

  2) Shorthand public-id:
     "photo": "cloudinary:awards/award-2024.jpg"
     "gallery": ["cloudinary:awards/award-2024-1.jpg"]

Shorthand requires env var:
  VITE_CLOUDINARY_CLOUD_NAME=<your-cloud-name>
Optional:
  VITE_CLOUDINARY_DELIVERY_PARAMS=f_auto,q_auto
