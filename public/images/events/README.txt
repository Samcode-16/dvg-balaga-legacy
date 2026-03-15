Place event photos here.

Naming convention:
  {event-id}.jpg  (e.g., dvg-award-2024.jpg)

Supported formats: .jpg, .jpeg, .png, .webp

These are referenced in public/content/events.json via the "photo" field.
Example: "/images/events/dvg-award-2024.jpg"

Cloudinary usage (recommended for production):
  1) Full URL:
     "photo": "https://res.cloudinary.com/<cloud-name>/image/upload/f_auto,q_auto/events/dvg-award-2024.jpg"

  2) Shorthand public-id:
     "photo": "cloudinary:events/dvg-award-2024.jpg"
     "gallery": [
       "cloudinary:events/dvg-award-2024-1.jpg",
       "cloudinary:events/dvg-award-2024-2.jpg"
     ]

Shorthand requires env var:
  VITE_CLOUDINARY_CLOUD_NAME=<your-cloud-name>
Optional:
  VITE_CLOUDINARY_DELIVERY_PARAMS=f_auto,q_auto
