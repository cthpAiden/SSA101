# G1 survey data report: week 5 cleaning and summary

Task (Timeline_G1, week 5): "Lọc thông tin và tổng hợp dữ liệu khảo sát". Criteria: clean data, grouped by age and field of study. Owners: Minh Ngọc, Phúc.
Prepared 9 October 2026 from the Google Form export `Mẫu không có tiêu đề.csv` (responses submitted 6 to 8 October 2026).

## Summary

The form received 53 responses. After removing 11 careless responses, 42 remain for analysis. Grouping by age was not possible because the form never asked for age or year of study, so this report groups respondents by field of study, gender and daily social media time instead.

In the cleaned sample, most students see early struggle at university as normal (62% agree, none disagree) and more than half say their biggest worry is their own future ability (57%). About four in ten compare themselves often with peers who seem better off (43%) and feel noticeable peer pressure (43%). Fewer than half believe most peers are doing better than them (36% agree, 43% neutral). Business students report the most pressure and the strongest sense that peers are ahead. These are descriptive results only; the group differences have not been tested.

## 1. Cleaning steps

| Step | Rule | Result |
|---|---|---|
| Duplicates | Identical answers on every item (timestamp ignored) | None found |
| Careless responses | Same value on all 11 scale items (Q5, Q6, Q8 to Q15, Q18) | 11 flagged and excluded: 4 answered all 5s, 3 all 3s, 2 all 4s and 2 all 1s. Some also contradict themselves: two all-5 responses said in Q16 they were "not much affected", and one all-1 response reported anxiety. All 11 are excluded so that one rule applies to everyone |
| Q6 label | The form shows the top option of Q6 as "Cột 5" instead of "5" | 7 answers recoded to 5 |
| Missing data | Blank answers | Response R01 (the first one, 6 Oct) has no answers for Q9 to Q11. It looks like those items were added after it was submitted. It is kept; it is missing only from those three items |
| Personal data | Names, student IDs, emails | None collected. The open question has one joke answer naming a group member; it is not quoted anywhere |

The final dataset has 42 included responses (`include = 1`). All 53 rows stay in the cleaned file with a `straightline` flag, so the team can rerun anything with the full sample.

## 2. Sample profile

| Group | Cleaned (n = 42) | All responses (n = 53) |
|---|---|---|
| Female | 24 (57%) | 32 (60%) |
| Male | 15 (36%) | 17 (32%) |
| Prefer not to say | 3 (7%) | 4 (8%) |
| Business (Kinh tế / Quản trị / Kinh doanh) | 15 (36%) | 21 (40%) |
| IT / Engineering | 11 (26%) | 13 (25%) |
| Art / Design / Other | 10 (24%) | 12 (23%) |
| Languages / Social sciences / Humanities | 6 (14%) | 7 (13%) |
| Social media 1 to 3 hours a day | 12 (29%) | 13 (25%) |
| Social media 3 to 5 hours a day | 15 (36%) | 18 (34%) |
| Social media more than 5 hours a day | 15 (36%) | 22 (42%) |

Nobody chose "less than 1 hour" for daily social media use.

## 3. Scale items (1 to 5)

"Agree" means a 4 or 5; "disagree" means a 1 or 2. For Q5 and Q6 the scale runs from "never" to "very often"; for Q12 from "no pressure" to "very high pressure".

| Item | n | Mean | SD | Agree / often | Disagree / rarely | Mean, all 53 |
|---|---|---|---|---|---|---|
| Q5 FOMO when friends post milestones | 42 | 3.19 | 1.13 | 36% | 21% | 3.26 |
| Q6 Compare with peers who seem better | 42 | 3.14 | 1.09 | 43% | 26% | 3.23 |
| Q8 Feel slow or not good enough when others succeed | 42 | 3.02 | 1.16 | 36% | 38% | 3.13 |
| Q9 Compare with peers who seem better (agree scale) | 41 | 3.05 | 1.18 | 37% | 27% | 3.15 |
| Q10 Compare with similar peers | 41 | 3.07 | 1.03 | 34% | 27% | 3.17 |
| Q11 Compare with worse-off peers to feel better | 41 | 2.80 | 1.05 | 24% | 37% | 2.96 |
| Q12 Felt peer pressure | 42 | 3.21 | 1.07 | 43% | 24% | 3.28 |
| Q13 Biggest worry is my future ability | 42 | 3.69 | 1.12 | 57% | 12% | 3.66 |
| Q14 Most students around me do better and progress faster | 42 | 3.14 | 0.93 | 36% | 21% | 3.23 |
| Q15 Changed my behaviour to fit in with friends | 42 | 2.95 | 1.19 | 38% | 36% | 3.08 |
| Q18 Early struggle is normal for most freshmen | 42 | 3.90 | 0.82 | 62% | 0% | 3.83 |

Removing the careless responses lowers most means by about 0.1. No item changes direction.

## 4. Multiple-choice items (cleaned sample, n = 42)

Respondents could pick more than one option, so percentages add up to more than 100%.

| Question | Most chosen options |
|---|---|
| Q4 Content seen most on social media | Travel, shopping and lifestyle highlights 79%; academic results, scholarships and certificates 71%; part-time jobs, internships and high income 55%; early success milestones ("own a house at 20") 40%; humble bragging 31% |
| Q7 What students compare | Grades and GPA 64%; soft skills, languages and extracurriculars 62%; part-time work, career chances and income 57%; looks, fashion and body 45%; popularity and number of friends 21% |
| Q16 Feelings during negative comparison | Low self-worth or self-doubt 60%; pushes me to work harder 50%; anxiety, stress or tiredness 48%; losing motivation 38%; not much affected 19% |
| Q17 Ways of coping | Make a personal plan to improve 62%; distract myself with films, social media or games 43%; talk to friends or family 38%; keep it to myself 33%; see a counsellor or psychologist 10% |

Only 4 of 42 students (10%) would seek professional help, while 14 (33%) keep it to themselves.

## 5. Means by group (cleaned sample)

Groups are small (6 to 24 people) and no significance tests were run, so treat gaps under about 0.5 as noise.

By field of study:

| Field | n | FOMO (Q5) | Upward comparison (Q6) | Not good enough (Q8) | Peer pressure (Q12) | Future worry (Q13) | Peers ahead (Q14) | Struggle is normal (Q18) |
|---|---|---|---|---|---|---|---|---|
| Business | 15 | 3.53 | 3.47 | 3.07 | 3.60 | 3.80 | 3.53 | 3.80 |
| IT / Engineering | 11 | 3.09 | 2.91 | 3.36 | 3.00 | 3.82 | 3.18 | 4.00 |
| Art / Design / Other | 10 | 3.00 | 3.00 | 2.40 | 2.50 | 3.10 | 2.50 | 4.00 |
| Languages / Social sciences | 6 | 2.83 | 3.00 | 3.33 | 3.83 | 4.17 | 3.17 | 3.83 |

Business students score highest on FOMO, upward comparison and feeling that peers are ahead. Art and Design students score lowest on pressure (2.50) and on feeling behind (2.50). The Languages group has the highest pressure and future worry, but it has only 6 people.

By gender:

| Gender | n | Q5 | Q6 | Q8 | Q12 | Q13 | Q14 | Q18 |
|---|---|---|---|---|---|---|---|---|
| Female | 24 | 3.08 | 3.21 | 2.88 | 3.21 | 3.67 | 3.04 | 3.83 |
| Male | 15 | 3.13 | 2.93 | 2.93 | 3.00 | 3.53 | 3.13 | 3.93 |
| Prefer not to say | 3 | 4.33 | 3.67 | 4.67 | 4.33 | 4.67 | 4.00 | 4.33 |

Female and male students answer much the same. The three who did not state a gender score high on everything, but three people are too few to read anything into.

By daily social media time:

| Time online | n | Q5 | Q6 | Q8 | Q12 | Q13 | Q14 | Q18 |
|---|---|---|---|---|---|---|---|---|
| 1 to 3 hours | 12 | 2.92 | 2.92 | 3.17 | 3.33 | 3.92 | 3.17 | 4.00 |
| 3 to 5 hours | 15 | 3.73 | 3.73 | 2.73 | 3.27 | 3.67 | 3.07 | 4.00 |
| More than 5 hours | 15 | 2.87 | 2.73 | 3.20 | 3.07 | 3.53 | 3.20 | 3.73 |

FOMO and upward comparison peak in the 3 to 5 hour group, not the heaviest users. More time online does not simply mean more comparison in this sample.

## 6. Open question (Q19)

22 of 53 people answered the optional question on what would help new students feel less peer pressure. Six answers were not usable (for example ".", "hihi", "nghỉ học", "có bồ"). Among the rest, the common themes were (some answers fit more than one):

- trust yourself and be yourself (about 6 answers);
- focus on your own progress and stop comparing grades with others, for example "better than yesterday's me" (about 6);
- use pressure as motivation or discipline (about 4);
- don't overthink it (2);
- step out of your comfort zone and try new things (2).

## 7. First look for the analysis team (week 5, Trúc and Hân)

Spearman correlations in the cleaned sample, as a starting point only:

| Pair | rho | n |
|---|---|---|
| Q5 FOMO and Q6 upward comparison | 0.60 | 42 |
| Q6 upward comparison and Q9 (same idea, agree scale) | 0.59 | 41 |
| Q14 peers ahead and Q12 peer pressure | 0.58 | 42 |
| Q8 not good enough and Q12 peer pressure | 0.53 | 42 |
| Q6 upward comparison and Q12 peer pressure | 0.50 | 42 |
| Q18 struggle is normal and Q12 peer pressure | 0.10 | 42 |

FOMO, upward comparison, feeling behind and peer pressure move together fairly strongly. Believing that early struggle is normal is almost unrelated to how much pressure students feel. Q6 and Q9 were meant to measure the same thing but share only a moderate correlation, so the analysis should use Q6 alone or the average of both, and say which.

## 8. Limits of this data

- **Age and year are missing.** The form has no question on age or year of study. Only R01 has a year answer, from a question that was later removed. First-year status is assumed from how the form was shared, not checked.
- **The slide 3 research questions cannot be tested.** They need self versus "typical first-year" ratings, a problematic social media use scale and a stress scale, and the form has none of these. This data can answer three nearby questions: whether most respondents believe peers are doing better (Q14), whether social media time and FOMO go with upward comparison (Q3, Q5 and Q6), and whether upward comparison and seeing struggle as normal go with felt pressure (Q6, Q18 and Q12).
- **There was no consent paragraph** at the start of the form.
- **Some items have measurement problems.** Q9 repeats Q6. Q9 to Q11 ask "how often" but use an agree scale. Every topic is measured by one question, so reliability (Cronbach's alpha) cannot be calculated.
- **The sample is small and self-selected.** With 42 responses, a test can reliably detect only correlations of about 0.4 or more (80% power, alpha 0.05), and results describe these respondents, not all first-year students.

## Files

All files are in `D:\FPT\SSL101\survey\`.

- `G1_survey_clean.csv`: all 53 responses with short English column names, ID numbers R01 to R53, the `straightline` flag and the `include` column. Original Vietnamese answers are kept for the multiple-choice and open questions.
- `build_clean_data.py`: the script that produced the cleaned file and every number in this report. Run it with Python 3 (`python build_clean_data.py`); it needs no extra packages.
- The raw export stays unchanged at `D:\FPT\SSL101\Mẫu không có tiêu đề.csv`.
