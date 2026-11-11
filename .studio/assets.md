# The app's files

The owner's own files, kept in the project's Blocks Storage. Studio copied the brand's files into `public/brand/` before this run; the app uses those copies.

- Logo (light mode): `public/brand/logo.png` (222×227, image/png); stored at https://blocksdev.blob.core.windows.net/d37088d949337437ea80c61bce50dfd50/Public/4db7d9fa-5751-4d03-a387-a03389ae8786/66bc4fc6-9829-4297-b579-36b98cd4b1c2/pikachu.png
- Logo (dark mode): `public/brand/logo-dark.png` (222×227, image/png); stored at https://blocksdev.blob.core.windows.net/d37088d949337437ea80c61bce50dfd50/Public/f2f6488c-a0c3-4e6a-9786-e726fff29e15/106500fc-0028-44d1-a371-c9fae6669afd/pikachu.png
- Favicon: `public/brand/favicon.png` (222×227, image/png); stored at https://blocksdev.blob.core.windows.net/d37088d949337437ea80c61bce50dfd50/Public/9c652b04-fef0-4704-b661-45ce8e64b7c8/2b62f472-979a-4f5b-8b21-c75a3f0f1c0a/pikachu.png

Rules:
- The brand is the logo: an <img> of `/brand/…` with alt="Quick Task Manager" wherever the design shows the brand; never the app's name drawn as text instead. Swap to the dark logo in dark mode.
- Link the favicon from index.html.
- Never invent an image address. A picture listed above may be shown by its address.
- A picture people change in the app (a product photo, a cover) is a Storage file id field on the record, uploaded and read through the Blocks Storage SDK (the vendored storage skill), never a pasted address.
