Place trustee and about page photos here.

Naming convention:
  trustee-name.jpg (e.g., nandini.jpg, natesh.jpg)

These are referenced in public/content/about.json via the "photo" field in trustees.
Example: "/images/about/nandini.jpg"

Cloudinary usage:
  1) Full URL:
     "photo": "https://res.cloudinary.com/<cloud-name>/image/upload/f_auto,q_auto/about/nandini.jpg"

  2) Shorthand public-id:
     "photo": "cloudinary:about/nandini.jpg"

Shorthand requires env var:
  VITE_CLOUDINARY_CLOUD_NAME=<your-cloud-name>
Optional:
  VITE_CLOUDINARY_DELIVERY_PARAMS=f_auto,q_auto
