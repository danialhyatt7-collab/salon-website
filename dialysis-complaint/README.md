# Patient Safety Complaint — Dialysis Incident

A single-page, static website documenting a formal patient-safety complaint to the
**Punjab Healthcare Commission** regarding a death during dialysis on **27 December 2025**
at **Hearts International Hospital, Rawalpindi**.

The site presents, in the complainant's own words:

- A summary of what happened
- A timeline of events (admission → dialysis → collapse → emergency response → outcome)
- The specific points requiring investigation
- The formal requests to the Commission
- The concern over the handling of CCTV evidence

## Design

Dark, cinematic aesthetic — deep teal / near-black with a glowing ring motif and neon-cyan
accents — kept dignified and restrained given the subject matter.

## Run it

It's a single `index.html` with no build step. Open it directly, or serve it:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Notes

All content is drawn directly from the complainant's account. No facts have been added or
embellished. The Punjab Healthcare Commission link points to the official regulator
(`phc.org.pk`).
