"""Week 5 cleaning and summary for the G1 survey. Reads the raw Google Forms CSV,
flags low-quality responses, writes a cleaned CSV with short column names,
and prints the tables used in the report."""
import csv, os, sys, statistics as st
from collections import Counter, defaultdict
sys.stdout.reconfigure(encoding="utf-8")

SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), "G1_survey_raw.csv")
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "G1_survey_clean.csv")

names = ["ts", "gender", "field", "sm_time", "content", "fomo", "upward", "domains",
         "not_enough", "upward2", "lateral", "downward", "pressure", "future_worry",
         "peers_better", "conformity", "emotions", "coping", "struggle_normal", "open", "year"]
LIK = ["fomo", "upward", "not_enough", "upward2", "lateral", "downward", "pressure",
       "future_worry", "peers_better", "conformity", "struggle_normal"]
LABEL = {
    "fomo": "Q5 FOMO when friends post milestones (how often)",
    "upward": "Q6 Compare with better-off peers (how often)",
    "not_enough": "Q8 Feel slow / not good enough when others succeed",
    "upward2": "Q9 Compare with better-off peers (agree)",
    "lateral": "Q10 Compare with similar peers (agree)",
    "downward": "Q11 Compare with worse-off peers to feel better (agree)",
    "pressure": "Q12 Felt peer pressure (1 none to 5 very)",
    "future_worry": "Q13 Biggest worry is future ability",
    "peers_better": "Q14 Most peers study better and progress faster than me",
    "conformity": "Q15 Changed behaviour to fit in",
    "struggle_normal": "Q18 Early struggle is normal for most freshmen",
}
FIELD_SHORT = {
    "Kinh tế / Quản trị / Lực lượng kinh doanh": "Business",
    "Công nghệ thông tin / Kỹ thuật": "IT / Engineering",
    "Nghệ thuật / Thiết kế / Khác": "Art / Design / Other",
    "Ngôn ngữ / Xã hội / Nhân văn": "Languages / Social sci.",
}
GENDER_SHORT = {"Nữ": "Female", "Nam": "Male", "Không muốn nêu cụ thể": "Not stated"}
TIME_SHORT = {"Từ 1 – 3 giờ": "1-3 h", "Từ 3 – 5 giờ": "3-5 h", "Trên 5 giờ": ">5 h", "Dưới 1 giờ": "<1 h"}

rows = list(csv.reader(open(SRC, encoding="utf-8-sig")))
recs = []
cot5 = 0
for i, r in enumerate(rows[1:], start=1):
    d = dict(zip(names, r))
    # Q6's top column is labelled "Cột 5" in the form; it is the 5 of the scale
    if d["upward"].strip() == "Cột 5":
        d["upward"] = "5"
        cot5 += 1
    d["id"] = f"R{i:02d}"
    vals = [d[k] for k in LIK if d[k].strip()]
    d["straightline"] = int(len(vals) >= 8 and len(set(vals)) == 1)
    recs.append(d)
clean = [d for d in recs if not d["straightline"]]


def num(d, k):
    v = d[k].strip()
    return int(v) if v else None


def desc(group, k):
    xs = [num(d, k) for d in group if num(d, k) is not None]
    n = len(xs)
    return dict(n=n, mean=st.mean(xs), sd=st.stdev(xs), med=st.median(xs),
                hi=100 * sum(x >= 4 for x in xs) / n, lo=100 * sum(x <= 2 for x in xs) / n)


def rank(xs):
    order = sorted(range(len(xs)), key=lambda i: xs[i])
    r = [0.0] * len(xs)
    i = 0
    while i < len(xs):
        j = i
        while j + 1 < len(xs) and xs[order[j + 1]] == xs[order[i]]:
            j += 1
        for t in range(i, j + 1):
            r[order[t]] = (i + j) / 2 + 1
        i = j + 1
    return r


def spearman(group, a, b):
    pairs = [(num(d, a), num(d, b)) for d in group if num(d, a) is not None and num(d, b) is not None]
    x, y = rank([p[0] for p in pairs]), rank([p[1] for p in pairs])
    mx, my = st.mean(x), st.mean(y)
    cov = sum((p - mx) * (q - my) for p, q in zip(x, y))
    return cov / (sum((p - mx) ** 2 for p in x) * sum((q - my) ** 2 for q in y)) ** 0.5, len(pairs)


def multi(group, k):
    c = Counter()
    for d in group:
        for opt in d[k].split(";"):
            if opt.strip():
                c[opt.strip()] += 1
    return c


print("RAW", len(recs), "CLEAN", len(clean), "| 'Cột 5' recoded:", cot5)
print("Straightliners:", [(d["id"], d[LIK[0]]) for d in recs if d["straightline"]])
print("Year column filled:", [(d["id"], d["year"]) for d in recs if d["year"].strip()])
print("Missing Q9-11:", [d["id"] for d in recs if not d["upward2"].strip()])

for label, grp in [("ALL 53", recs), ("CLEAN", clean)]:
    print(f"\n== Likert, {label}")
    for k in LIK:
        s = desc(grp, k)
        print(f"{LABEL[k]:60s} n={s['n']:2d} M={s['mean']:.2f} SD={s['sd']:.2f} Mdn={s['med']} 4-5={s['hi']:.0f}% 1-2={s['lo']:.0f}%")

print("\n== Profile (clean)")
for k, m in [("gender", GENDER_SHORT), ("field", FIELD_SHORT), ("sm_time", TIME_SHORT)]:
    c = Counter(m[d[k]] for d in clean)
    print(k, [(a, b, f"{100*b/len(clean):.0f}%") for a, b in c.most_common()])

for k in ["content", "domains", "emotions", "coping"]:
    print(f"\n== {k} (clean, n={len(clean)})")
    for opt, c in multi(clean, k).most_common():
        print(f"  {c:2d} ({100*c/len(clean):.0f}%)  {opt}")

KEY = ["fomo", "upward", "not_enough", "pressure", "future_worry", "peers_better", "struggle_normal"]
for gk, m in [("field", FIELD_SHORT), ("gender", GENDER_SHORT), ("sm_time", TIME_SHORT)]:
    print(f"\n== Means by {gk} (clean)")
    groups = defaultdict(list)
    for d in clean:
        groups[m[d[gk]]].append(d)
    print("group".ljust(26), "n ", " ".join(k[:8].rjust(8) for k in KEY))
    for g, grp in sorted(groups.items(), key=lambda t: -len(t[1])):
        print(g.ljust(26), str(len(grp)).rjust(2), " ".join(f"{desc(grp, k)['mean']:8.2f}" for k in KEY))

print("\n== Spearman checks (clean)")
for a, b in [("upward", "upward2"), ("upward", "pressure"), ("fomo", "upward"), ("peers_better", "pressure"),
             ("struggle_normal", "pressure"), ("not_enough", "pressure")]:
    r, n = spearman(clean, a, b)
    print(f"{a} ~ {b}: rho={r:.2f} n={n}")

# cleaned file: short English headers, original answers kept, plus flags
import os
os.makedirs(os.path.dirname(OUT), exist_ok=True)
cols = ["id", "ts", "gender", "field", "sm_time"] + LIK + ["content", "domains", "emotions", "coping", "open", "straightline", "include"]
with open(OUT, "w", encoding="utf-8-sig", newline="") as f:
    w = csv.writer(f)
    w.writerow(cols)
    for d in recs:
        row = dict(d)
        row["gender"] = GENDER_SHORT[d["gender"]]
        row["field"] = FIELD_SHORT[d["field"]]
        row["sm_time"] = TIME_SHORT[d["sm_time"]]
        row["include"] = 0 if d["straightline"] else 1
        w.writerow([row[c] for c in cols])
print("\nwrote", OUT)
