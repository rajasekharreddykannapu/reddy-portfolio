# Running page — adding your photos

Photos attach to any run on the `/running` page.

## Steps

1. Drop your image files into `public/running/photos/`
   (e.g. `telangana-finish.jpg`, `tcs-medal.jpg`). JPG/PNG/WebP all work.

2. Open [`src/data/run-photos.json`](../../src/data/run-photos.json) and map the
   run's **Strava activity id** to your filenames:

   ```json
   {
     "18817317833": ["telangana-finish.jpg", "medal.jpg"],
     "18628386726": ["city-slam.jpg"]
   }
   ```

   Find a run's id via the **View on Strava** link on its card (the number at the
   end of the URL), or in [`src/data/runs.json`](../../src/data/runs.json).

3. The photos show up in that run's **Details** panel automatically. This file is
   never overwritten when the Strava data is refreshed.

Keep images reasonably sized (long edge ~1600px) — they're served as-is (the site
uses `images.unoptimized`).
