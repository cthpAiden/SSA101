# SSA101 Group 1: Peer Pressure on Self-Comparison

Project files for SSA101 (Academic Skills), FPT University, Fall 2026. The group studied how peer pressure shapes self-comparison in first-year university students, using a literature review and an anonymous survey of 53 students.

Team: Phúc, Minh Ngọc, Hân, Huyền, Trúc.

## Folders

| Folder | What is inside |
| --- | --- |
| `00_admin` | Team timeline and task split (`Timeline_G1.xlsx`) |
| `01_literature_review` | Task 1 and Task 2 source reviews (md and docx), research notes, fact check of all cited numbers |
| `02_proposal` | Proposal document, proposal slides and PDF, presentation script |
| `03_research_defense` | Research Courtroom slides, Vietnamese script, 30 s video abstract and graphical abstract |
| `04_survey` | Raw Google Forms export, cleaning script, cleaned data, Week 5 data report |
| `05_poster` | Final portrait poster (HTML source and PDF), earlier versions, before/after previews |
| `06_ai_ethics_session` | Week 6 topic session "How to Use AI to Help, Not Hinder, Learning": slides, scripts, game hub, Kahoot quiz, mockups, Remotion intro video |
| `07_final_report` | 5-slide final progress report and Vietnamese presentation script |

## Survey data

`04_survey/G1_survey_raw.csv` is the anonymous Google Forms export (no names or emails). To rebuild the cleaned file:

```bash
python 04_survey/build_clean_data.py
```

## Intro video

The rendered intro video (`06_ai_ethics_session/intro_video/out/*.mp4`, 169 MB) is stored with Git LFS. Run `git lfs install` before cloning to get the real file. To render it again, see `06_ai_ethics_session/intro_video/README.md`.
