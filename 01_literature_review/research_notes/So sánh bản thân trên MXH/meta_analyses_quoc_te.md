# International peer-reviewed evidence on social comparison on social media (meta-analyses, reviews, landmark studies)

Verification notes (read first)
- Every reference below was verified against the Crossref API record for its DOI on 2026-09-21 (authors, journal, volume, issue, pages, year). "Crossref cites" = Crossref `is-referenced-by-count` on 2026-09-21. "S2 cites" = Semantic Scholar `citationCount`; "OpenAlex cites" = OpenAlex `cited_by_count`, both retrieved 2026-09-21.
- Google Scholar citation counts: NOT obtained. scholar.google.com returned a CAPTCHA ("Hãy thể hiện rằng bạn không phải là rô-bốt"); per the task rules I did not attempt to solve it. Use the Crossref / Semantic Scholar / OpenAlex counts as lower-bound proxies (Google Scholar counts are normally higher).
- Abstracts were retrieved from Europe PMC (REST API), PLOS, Semantic Scholar API, OpenAlex API, or the Crossref record. PubMed (cookie wall), APA PsycNet (JS loading), Guilford (HTTP 403), Taylor & Francis (403) and ScienceDirect (403) could not be fetched. Any number I could not confirm from one of those sources is marked "unverified".
- Year = print/issue year as recorded in Crossref `published-print`. Where online-first year differs, both are given.

## KQ1. What do meta-analyses and reviews say about social comparison on SNS and depression, self-esteem, life satisfaction, body dissatisfaction?

### Takeaway
Meta-analyses converge on a small overall association between social-media *use* and poorer mental health (r ≈ −0.07 for time spent and wellbeing; r ≈ 0.17 for use and body-image disturbance), but a clearly larger association when the variable is *social comparison* (especially *upward* comparison) rather than time spent: Yoon et al. (2019) found upward comparison had a medium-sized link to depression versus small links for time/checking, and McComb et al. (2023) found experimental exposure to upward comparison targets on social media lowered self-evaluations and emotions overall (g = −0.24), with body image (g = −0.31) the largest effect.

### Cited Findings

**1. Yoon, S., Kleinman, M., Mertz, J., & Brannick, M. (2019). Is social network site usage related to depression? A meta-analysis of Facebook–depression relations. *Journal of Affective Disorders, 248*, 65–72. https://doi.org/10.1016/j.jad.2019.01.026**
- Study type: meta-analysis (4 separate meta-analyses). PMID 30711871. Crossref cites 289; Europe PMC cites 150; S2 cites 298; OpenAlex cites 366 (2026-09-21). — [Crossref](https://api.crossref.org/works/10.1016/j.jad.2019.01.026); [Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1016/j.jad.2019.01.026&resultType=core&format=json)
- Samples: "33 articles with a sample of 15,881 for time spent on SNS, 12 articles with a sample of 8041 for SNS checking frequency, and 5 articles with a sample of 1715 and 2298 for the general and the upward social comparison analyses, respectively." — [Semantic Scholar record](https://api.semanticscholar.org/graph/v1/paper/DOI:10.1016/j.jad.2019.01.026?fields=title,abstract,citationCount)
- Results as stated in abstract: time spent and checking frequency showed *small* correlations with depression; general social comparison on SNS a *small-to-medium* correlation; upward social comparison on SNS a *medium* correlation; social-comparison effects were larger than the usage-time effects. — [Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1016/j.jad.2019.01.026&resultType=core&format=json)
- Exact r values: unverified (abstract text retrieved only labels effects "small / small to medium / medium"; the numeric r's are in the full text, which was not accessible). Commonly quoted values (approx. r = .11 time, .10 checking, .23 general comparison, .33 upward comparison) should be checked in the PDF before citing.
- Framing: "Researchers have argued that upward social comparisons made on SNS are the key to the Facebook depression phenomenon." — [Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1016/j.jad.2019.01.026&resultType=core&format=json)

**2. McComb, C. A., Vanman, E. J., & Tobin, S. J. (2023). A meta-analysis of the effects of social media exposure to upward comparison targets on self-evaluations and emotions. *Media Psychology, 26*(5), 612–635. https://doi.org/10.1080/15213269.2023.2180647**
- Study type: multilevel random-effects meta-analysis of *experimental* studies. Crossref cites 152; S2 cites 152 (2026-09-21). — [Crossref](https://api.crossref.org/works/10.1080/15213269.2023.2180647)
- "We identified 48 articles involving 7679 participants through a systematic search and entered 118 effect sizes into a multilevel, random-effects meta-analysis." — [Semantic Scholar](https://api.semanticscholar.org/graph/v1/paper/DOI:10.1080/15213269.2023.2180647?fields=title,abstract,citationCount)
- Overall effect of upward comparison (vs downward comparison and controls) on self-evaluations and emotions: g = −0.24, p < .001. By outcome: body image g = −0.31; subjective well-being g = −0.19; mental health g = −0.21; self-esteem g = −0.21 (all p < .001). — [Semantic Scholar](https://api.semanticscholar.org/graph/v1/paper/DOI:10.1080/15213269.2023.2180647?fields=title,abstract,citationCount)
- Conclusion: "contrast is the dominant response to upward comparison on social media, which results in negative self-evaluations and emotions." — same source.

**3. Saiphoo, A. N., & Vahedi, Z. (2019). A meta-analytic review of the relationship between social media use and body image disturbance. *Computers in Human Behavior, 101*, 259–275. https://doi.org/10.1016/j.chb.2019.07.028**
- Study type: meta-analysis of cross-sectional studies, random-effects. Crossref cites 474; S2 cites 467 (2026-09-21). — [Crossref](https://api.crossref.org/works/10.1016/j.chb.2019.07.028)
- "An analysis of sixty-three independent samples (N = 36,552) using a random-effects model revealed an overall effect size of r = 0.169, CI [0.131, 0.206], indicating a small, positive, and significant relationship between social media use and body image disturbance." — [Semantic Scholar](https://api.semanticscholar.org/graph/v1/paper/DOI:10.1016/j.chb.2019.07.028?fields=title,abstract,citationCount)
- Moderators: "Type of social media use, body image dimension, country grouping, and age were all found to be significant moderators." — same source.

**4. Huang, C. (2017). Time spent on social network sites and psychological well-being: A meta-analysis. *Cyberpsychology, Behavior, and Social Networking, 20*(6), 346–354. https://doi.org/10.1089/cyber.2016.0758**
- Study type: meta-analysis. PMID 28622031. Crossref cites 381; Europe PMC cites 147 (2026-09-21). — [Crossref](https://api.crossref.org/works/10.1089/cyber.2016.0758)
- "Sixty-one studies consisting of 67 independent samples involving 19,652 participants were identified. The mean correlation between time spent on social networking sites and psychological well-being was low at r = −0.07." Correlations with self-esteem and life satisfaction "were close to 0", with depression and loneliness "weak". Moderators (outlet, site, time scale, age, gender) not significant; most samples were students. — [Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1089/cyber.2016.0758&resultType=core&format=json)

**5. Meier, A., & Reinecke, L. (2021). Computer-mediated communication, social media, and mental health: A conceptual and empirical meta-review. *Communication Research, 48*(8), 1182–1209. https://doi.org/10.1177/0093650220958224** (online first 2020)
- Study type: meta-review (review of reviews) — NOT a primary meta-analysis. "a meta-review of 34 reviews and a content analysis of 594 publications. Meta-analytic evidence, overall, suggests a small negative association between social media use and MH. However, effects are complex and depend on the CMC and MH indicators investigated." Crossref cites 402; S2 cites 430 (2026-09-21). — [Crossref](https://api.crossref.org/works/10.1177/0093650220958224); [Semantic Scholar](https://api.semanticscholar.org/graph/v1/paper/DOI:10.1177/0093650220958224?fields=title,abstract,citationCount)
- No pooled effect size of its own; no explicit social-comparison figure in the abstract.

**6. Fardouly, J., & Vartanian, L. R. (2016). Social media and body image concerns: Current research and future directions. *Current Opinion in Psychology, 9*, 1–5. https://doi.org/10.1016/j.copsyc.2015.09.005**
- Study type: narrative review. Crossref cites 658; S2 cites 729 (2026-09-21). — [Crossref](https://api.crossref.org/works/10.1016/j.copsyc.2015.09.005)
- "Correlational studies consistently show that social media usage (particularly Facebook) is associated with body image concerns among young women and men, and longitudinal studies suggest that this association may strengthen over time. Furthermore, appearance comparisons play a role in the relationship between social media and body image. Experimental studies, however, suggest that brief exposure to one's own Facebook account does not negatively impact young women's appearance concerns." — [Semantic Scholar](https://api.semanticscholar.org/graph/v1/paper/DOI:10.1016/j.copsyc.2015.09.005?fields=title,abstract,citationCount)
- CONTRADICTION FLAG: this review says brief own-account Facebook exposure does not harm appearance concerns, whereas Fardouly et al. (2015, below) found a mood effect and an appearance-discrepancy effect only among high-comparison women; McComb et al. (2023) found g = −0.31 for body image when the manipulation is exposure to *upward comparison targets* (not merely one's own feed). The difference in what is manipulated (own feed vs. idealised targets) explains most of the apparent conflict.

**7. Appel, H., Gerlach, A. L., & Crusius, J. (2016). The interplay between Facebook use, social comparison, envy, and depression. *Current Opinion in Psychology, 9*, 44–49. https://doi.org/10.1016/j.copsyc.2015.10.006**
- Study type: narrative review. Crossref cites 476; S2 cites 536 (2026-09-21). — [Crossref](https://api.crossref.org/works/10.1016/j.copsyc.2015.10.006)
- "Studies show that (especially passive) Facebook use indeed predicts different measures of social comparison as well as envy. In several studies social comparison or envy mediate a positive association between Facebook use and undesirable affective outcomes such as depression. However, causal relationships have not yet been sufficiently established." — [Semantic Scholar](https://api.semanticscholar.org/graph/v1/paper/DOI:10.1016/j.copsyc.2015.10.006?fields=title,abstract,citationCount)

**8. Verduyn, P., Ybarra, O., Résibois, M., Jonides, J., & Kross, E. (2017). Do social network sites enhance or undermine subjective well-being? A critical review. *Social Issues and Policy Review, 11*(1), 274–302. https://doi.org/10.1111/sipr.12033**
- Study type: critical narrative review. Crossref cites 1017; S2 cites 1106; OpenAlex cites 1230 (2026-09-21). — [Crossref](https://api.crossref.org/works/10.1111/sipr.12033)
- Abstract: "negative relationships between passively using social network sites and subjective well-being, and (b) positive relationships between actively using social network sites and subjective well-being"; passive use "triggers social comparisons and envy, which have negative downstream consequences"; the passive-use relationship is more robust than the active-use one. — [Crossref abstract](https://api.crossref.org/works/10.1111/sipr.12033); [OpenAlex](https://api.openalex.org/works/doi:10.1111/sipr.12033)

**9. Verduyn, P., Gugushvili, N., Massar, K., Täht, K., & Kross, E. (2020). Social comparison on social networking sites. *Current Opinion in Psychology, 36*, 32–37. https://doi.org/10.1016/j.copsyc.2020.04.002** (online 14 April 2020; print issue December 2020)
- Study type: narrative review. Crossref cites 429; S2 cites 446 (2026-09-21). — [Crossref](https://api.crossref.org/works/10.1016/j.copsyc.2020.04.002)
- "The occurrence of social comparisons on SNSs depends on who uses the SNS and on how the SNS is being used with passive use in particular resulting in increased levels of social comparison. Moreover, social comparison on SNSs may occasionally result in an increase in SWB but typically negative effects are found as people tend to engage in contrasting upward social comparisons. Finally, several studies show that social comparison is a key mechanism explaining the relationship between use of SNSs and SWB and that users with a tendency to engage in social comparison are especially likely to be negatively impacted by SNSs." — [Semantic Scholar](https://api.semanticscholar.org/graph/v1/paper/DOI:10.1016/j.copsyc.2020.04.002?fields=title,abstract,citationCount)

### Inferences
- The gradient "time spent (r ≈ −0.07 to ~0.1) < general comparison < upward comparison" across Huang (2017) and Yoon et al. (2019) implies that for a student essay the mechanism (comparison), not screen time, is the variable to emphasise.
- The experimental meta-analysis (McComb et al., 2023) plus the correlational meta-analyses (Saiphoo & Vahedi, 2019; Yoon et al., 2019) give converging correlational and causal evidence, but effect sizes are small-to-medium, so claims of "social media causes depression" overstate the literature.

### Gaps
- Exact r values from Yoon et al. (2019) not confirmed (full text paywalled; PubMed blocked).
- Moderator-level effect sizes in McComb et al. (2023) (e.g., Instagram vs Facebook, comparison type) not retrievable from the abstract.
- Google Scholar citation counts unavailable (CAPTCHA).

## KQ2. What do landmark empirical studies (experiments, experience sampling, longitudinal) show?

### Takeaway
Experimental and intensive-longitudinal studies consistently show that Facebook/Instagram use, and especially passive use and upward comparison, predict lower momentary affect, life satisfaction and self-esteem, and that reducing use (a 1-week break, N = 1,095; or a 10-min/platform/day limit for 3 weeks, N = 143) improves wellbeing or lowers depression and loneliness.

### Cited Findings

**10. Vogel, E. A., Rose, J. P., Roberts, L. R., & Eckles, K. (2014). Social comparison, social media, and self-esteem. *Psychology of Popular Media Culture, 3*(4), 206–222. https://doi.org/10.1037/ppm0000047**
- Study type: correlational study + laboratory experiment (2 studies). Crossref cites 1124; S2 cites 1355; OpenAlex cites 1387 (2026-09-21). — [Crossref](https://api.crossref.org/works/10.1037/ppm0000047)
- Abstract opening (only part retrievable): "Social networking sites (SNSs), such as Facebook, provide abundant social comparison opportunities. Given the widespread use of SNSs, purpose of present set of studies was to examine the impact of chronic and temporary exposure to social media-based social comparison information on self-este[em]". — [OpenAlex](https://api.openalex.org/works/doi:10.1037/ppm0000047)
- Sample sizes and specific findings (frequent Facebook use associated with lower trait self-esteem, mediated by greater upward comparison; exposure to an upward-comparison profile lowering state self-esteem): unverified from retrievable sources (APA PsycNet did not load). Commonly reported Ns (Study 1 ≈ 145; Study 2 ≈ 128) are unverified.

**11. Chou, H.-T. G., & Edge, N. (2012). "They are happier and having better lives than I am": The impact of using Facebook on perceptions of others' lives. *Cyberpsychology, Behavior, and Social Networking, 15*(2), 117–121. https://doi.org/10.1089/cyber.2011.0324**
- Study type: cross-sectional survey. N = 425 undergraduates at a state university in Utah. PMID 22165917. Crossref cites 864; Europe PMC cites 224 (2026-09-21). — [Crossref](https://api.crossref.org/works/10.1089/cyber.2011.0324); [Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1089/cyber.2011.0324&resultType=core&format=json)
- "those who have used Facebook longer agreed more that others were happier, and agreed less that life is fair, and those spending more time on Facebook each week agreed more that others were happier and had better lives. Furthermore, those that included more people whom they did not personally know as their Facebook 'friends' agreed more that others had better lives." Mechanisms proposed: availability heuristic and correspondence bias. — Europe PMC (same link). No effect sizes in abstract.

**12. Steers, M.-L. N., Wickham, R. E., & Acitelli, L. K. (2014). Seeing everyone else's highlight reels: How Facebook usage is linked to depressive symptoms. *Journal of Social and Clinical Psychology, 33*(8), 701–731. https://doi.org/10.1521/jscp.2014.33.8.701**
- Study type: Study 1 cross-sectional (N = 180); Study 2 14-day daily diary (N = 152). Crossref cites 374; S2 cites 476; OpenAlex cites 542 (2026-09-21). — [Crossref](https://api.crossref.org/works/10.1521/jscp.2014.33.8.701)
- "Study 1 (N = 180) revealed an association between time spent on Facebook and depressive symptoms for both genders. However, results demonstrated that making social comparisons mediated the link between time spent on Facebook and depressive symptoms for men only. Using a 14-day diary design (N = 152), Study 2 found that [the] relationship between amount of time spent on Facebook [and depressive symptoms] was uniquely mediated by upward, nondirectional, and downward social comparisons ... Unlike Study 1, gender did not moderate these associations." — [OpenAlex reconstruction](https://api.openalex.org/works/doi:10.1521/jscp.2014.33.8.701) (bracketed words are my reconstruction of a garbled fragment; check against PDF).
- Key point for KQ3: in Study 2 *all three* comparison directions (upward, nondirectional, downward) mediated the Facebook–depression link. — same source.

**13. Feinstein, B. A., Hershenberg, R., Bhatia, V., Latack, J. A., Meuwly, N., & Davila, J. (2013). Negative social comparison on Facebook and depressive symptoms: Rumination as a mechanism. *Psychology of Popular Media Culture, 2*(3), 161–170. https://doi.org/10.1037/a0033111**
- Study type: short-term longitudinal survey (undergraduates). Crossref cites 390; OpenAlex cites 508 (2026-09-21). — [Crossref](https://api.crossref.org/works/10.1037/a0033111)
- Abstract opening: "Recent research demonstrates that it is the quality rather than the frequency of social networking experiences that places individuals at risk for negative mental health outcomes. However, the mechanisms that account for this association have yet to be examined." — [OpenAlex](https://api.openalex.org/works/doi:10.1037/a0033111)
- N, follow-up length (commonly reported as N = 268, 3-week follow-up) and the finding that negative Facebook comparison predicted increased depressive symptoms via rumination: unverified from retrievable sources.

**14. Kross, E., Verduyn, P., Demiralp, E., Park, J., Lee, D. S., Lin, N., Shablack, H., Jonides, J., & Ybarra, O. (2013). Facebook use predicts declines in subjective well-being in young adults. *PLoS ONE, 8*(8), e69841. https://doi.org/10.1371/journal.pone.0069841**
- Study type: experience-sampling (5 texts/day for 14 days). N = 82 recruited, 79 analysed (4,589 observations; 83.6% response rate). Crossref cites 1119 (2026-09-21). — [PLOS ONE](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0069841); [Crossref](https://api.crossref.org/works/10.1371/journal.pone.0069841)
- Facebook use at one time point predicted worse affect at the next: B = .08, χ² = 28.90, p < .0001. Average Facebook use over 14 days predicted declining life satisfaction: B = −.012, β = −.124, t(73) = −2.39, p = .02. Direct social interaction predicted *better* affect (B = −.15, p < .0001). Effects not moderated by network size, support, motivation, gender, loneliness, self-esteem or depression. — [PLOS ONE](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0069841)
- Social comparison was *speculated* as a mechanism, not measured. — same source.

**15. Verduyn, P., Lee, D. S., Park, J., Shablack, H., Orvell, A., Bayer, J., Ybarra, O., Jonides, J., & Kross, E. (2015). Passive Facebook usage undermines affective well-being: Experimental and longitudinal evidence. *Journal of Experimental Psychology: General, 144*(2), 480–488. https://doi.org/10.1037/xge0000057**
- Study type: Study 1 lab experiment (passive vs active use); Study 2 experience-sampling field study. S2 cites 890; OpenAlex cites 1019 (2026-09-21). — [OpenAlex](https://api.openalex.org/works/doi:10.1037/xge0000057)
- "cueing people in the laboratory to use Facebook passively (rather than actively) led to declines in affective well-being. Study 2 replicated these findings in a field setting ... It also demonstrated how passive Facebook usage leads to declines in affective well-being: by increasing envy." Effect held controlling for active use, other SNS use and direct interaction. — OpenAlex (same link). Ns per study: unverified.

**16. Tromholt, M. (2016). The Facebook experiment: Quitting Facebook leads to higher levels of well-being. *Cyberpsychology, Behavior, and Social Networking, 19*(11), 661–666. https://doi.org/10.1089/cyber.2016.0259**
- Study type: randomised 1-week experiment, Denmark, late 2015, N = 1,095. PMID 27831756. Crossref cites 311; Europe PMC cites 126 (2026-09-21). — [Crossref](https://api.crossref.org/works/10.1089/cyber.2016.0259); [Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1089/cyber.2016.0259&resultType=core&format=json)
- "taking a break from Facebook has positive effects on the two dimensions of well-being: our life satisfaction increases and our emotions become more positive. Furthermore, ... these effects were significantly greater for heavy Facebook users, passive Facebook users, and users who tend to envy others on Facebook." — Europe PMC (same link). Effect sizes: unverified (not in abstract).

**17. Hunt, M. G., Marx, R., Lipson, C., & Young, J. (2018). No more FOMO: Limiting social media decreases loneliness and depression. *Journal of Social and Clinical Psychology, 37*(10), 751–768. https://doi.org/10.1521/jscp.2018.37.10.751**
- Study type: randomised controlled experiment, 3 weeks. N = 143 undergraduates. Crossref cites 739; OpenAlex cites 961 (2026-09-21). — [Crossref abstract](https://api.crossref.org/works/10.1521/jscp.2018.37.10.751)
- Participants were assigned to "limit Facebook, Instagram and Snapchat use to 10 minutes, per platform, per day, or to use social media as usual for three weeks." The limited group "showed significant reductions in loneliness and depression over three weeks compared to the control group." Both groups showed decreases in anxiety and FoMO. Authors conclude "limiting social media use to approximately 30 minutes per day may lead to significant improvement in well-being." — Crossref abstract (same link). Effect sizes: unverified.

### Inferences
- Together, Kross (2013) → Verduyn (2015) → Tromholt (2016) → Hunt (2018) form a chain from correlational experience sampling to causal manipulation; envy/comparison is the mediator identified experimentally in Verduyn et al. (2015) and the moderator in Tromholt (2016).
- For a university-student audience, note that most of these samples are undergraduates (Chou & Edge, Steers, Hunt, Kross, Vogel), which supports relevance but limits generalisability (Huang, 2017 makes the same point).

### Gaps
- Vogel et al. (2014) and Feinstein et al. (2013) full abstracts/Ns were not retrievable (APA PsycNet did not load; OpenAlex index truncated).
- Effect sizes for Tromholt (2016) and Hunt et al. (2018) are in full text only.

## KQ3. Upward vs downward comparison; Instagram/TikTok-specific evidence

### Takeaway
Upward comparison is the dominant and most harmful form on social media (McComb et al., 2023: contrast effects; Yoon et al., 2019: upward > general comparison), but Steers et al. (2014) found that downward and nondirectional comparisons *also* mediated the Facebook–depression link in a diary study, so downward comparison is not reliably protective. Instagram and TikTok experiments show idealised/fitspiration content raises state appearance comparison, which mediates effects on body dissatisfaction and mood.

### Cited Findings
- Upward comparison vs downward comparison and controls on social media: overall g = −0.24; the meta-analysis "indicates that contrast is the dominant response to upward comparison on social media". — [McComb et al., 2023, Semantic Scholar](https://api.semanticscholar.org/graph/v1/paper/DOI:10.1080/15213269.2023.2180647?fields=title,abstract,citationCount)
- Upward comparison on SNS showed a medium correlation with depression, larger than general comparison (small-to-medium). — [Yoon et al., 2019, Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1016/j.jad.2019.01.026&resultType=core&format=json)
- CONTRADICTION FLAG: in a 14-day diary, the Facebook–depressive-symptoms link "was uniquely mediated by upward, nondirectional, and downward social comparisons" — i.e., downward comparison also carried the negative effect. — [Steers et al., 2014, OpenAlex](https://api.openalex.org/works/doi:10.1521/jscp.2014.33.8.701)
- Review position: "people tend to engage in contrasting upward social comparisons"; comparison "may occasionally result in an increase in SWB but typically negative effects are found". — [Verduyn et al., 2020](https://api.semanticscholar.org/graph/v1/paper/DOI:10.1016/j.copsyc.2020.04.002?fields=title,abstract,citationCount)

**18. Fardouly, J., Diedrichs, P. C., Vartanian, L. R., & Halliwell, E. (2015). Social comparisons on social media: The impact of Facebook on young women's body image concerns and mood. *Body Image, 13*, 38–45. https://doi.org/10.1016/j.bodyim.2014.12.002**
- Study type: randomised experiment, 3 conditions (own Facebook account / fashion-magazine website / appearance-neutral control, 10 min each). N = 112 women. Crossref cites 787; S2 cites 972 (2026-09-21). — [Crossref](https://api.crossref.org/works/10.1016/j.bodyim.2014.12.002)
- "Participants who spent time on Facebook reported being in a more negative mood than those who spent time on the control website. Furthermore, women high in appearance comparison tendency reported more facial, hair, and skin-related discrepancies after Facebook exposure than exposure to the control website." — [Semantic Scholar](https://api.semanticscholar.org/graph/v1/paper/DOI:10.1016/j.bodyim.2014.12.002?fields=title,abstract,citationCount). Effect sizes: unverified.

**19. Sherlock, M., & Wagstaff, D. L. (2019). Exploring the relationship between frequency of Instagram use, exposure to idealized images, and psychological well-being in women. *Psychology of Popular Media Culture, 8*(4), 482–490. https://doi.org/10.1037/ppm0000182** (advance online 2018; print issue 2019)
- Study type: correlational survey + experimental exposure to Instagram images (women). Crossref cites 252; S2 cites 279; OpenAlex cites 338 (2026-09-21). — [Crossref](https://api.crossref.org/works/10.1037/ppm0000182)
- Abstract not retrievable from any open API (PsycNet did not load; S2/OpenAlex abstract null). Reported findings (Instagram frequency correlated with depressive symptoms, anxiety, lower self-esteem and body dissatisfaction, mediated by social comparison orientation; brief exposure to beauty/fitness images reduced self-rated attractiveness): unverified.

**20. Pryde, S., & Prichard, I. (2022). TikTok on the clock but the #fitspo don't stop: The impact of TikTok fitspiration videos on women's body image concerns. *Body Image, 43*, 244–252. https://doi.org/10.1016/j.bodyim.2022.09.004**
- NOTE: the DOI suffix is 2022.09.004 (Crossref), not 2022.11.004.
- Study type: randomised experiment. N = 120 Australian women aged 18–25; fitspiration TikTok videos vs art-control TikTok videos. Crossref cites 99; S2 cites 101 (2026-09-21). — [Crossref search](https://api.crossref.org/works?query.bibliographic=Pryde+Prichard+TikTok+body+image+2022&rows=3)
- "exposure to fitspiration TikTok videos increased state appearance comparison and state negative mood relative to art TikTok videos but did not directly increase state body dissatisfaction. State appearance comparison significantly mediated the effect of TikTok videos on body dissatisfaction and mood, however, there was no moderating effect of trait fit ideal internalisation." — [Semantic Scholar](https://api.semanticscholar.org/graph/v1/paper/DOI:10.1016/j.bodyim.2022.09.004?fields=title,abstract,citationCount)

### Inferences
- The TikTok result (no direct effect on body dissatisfaction, but an indirect effect via state comparison) mirrors the Facebook finding of Fardouly et al. (2015) that effects appear mainly among those who compare; comparison is the active ingredient across platforms.
- Steers et al. (2014) suggests that for depressive symptoms, *engaging in comparison at all* on Facebook may be harmful, whereas for self-evaluation outcomes the direction (upward) matters most (McComb et al., 2023).

### Gaps
- No meta-analysis specific to TikTok or Instagram comparison was found within the call budget.
- Sherlock & Wagstaff (2019) numbers unverified.

## KQ4. Measurement scales for social comparison (general and social-media-specific)

### Takeaway
The two classic instruments are the INCOM (Gibbons & Buunk, 1999; comparison *orientation*, validated in US and Dutch samples) and the Social Comparison Rating Scale (Allan & Gilbert, 1995; rank/attractiveness/belonging comparisons, linked to psychopathology). A social-media-specific, validated instrument for *state upward* comparison was published in 2025 (Yu & Cingel; two 4-item scales, N = 462).

### Cited Findings

**21. Gibbons, F. X., & Buunk, B. P. (1999). Individual differences in social comparison: Development of a scale of social comparison orientation. *Journal of Personality and Social Psychology, 76*(1), 129–142. https://doi.org/10.1037/0022-3514.76.1.129**
- Scale: Iowa-Netherlands Comparison Orientation Measure (INCOM). "a scale was constructed so as to be appropriate and comparable in 2 cultures: American and Dutch. It was then administered to several thousand people in each country ... the scale has good psychometric properties. In addition, a laboratory study and several field studies ... demonstrated the INCOM's ability to predict comparison behavior effectively." Crossref cites 1439; OpenAlex cites 1472 (2026-09-21). — [OpenAlex](https://api.openalex.org/works/doi:10.1037/0022-3514.76.1.129); [Crossref](https://api.crossref.org/works/10.1037/0022-3514.76.1.129)
- Number of items (commonly 11): unverified from abstract.

**22. Allan, S., & Gilbert, P. (1995). A social comparison scale: Psychometric properties and relationship to psychopathology. *Personality and Individual Differences, 19*(3), 293–299. https://doi.org/10.1016/0191-8869(95)00086-L**
- Scale: Social Comparison Rating Scale (semantic-differential format). Crossref cites 374; S2 cites 521; OpenAlex cites 533 (2026-09-21). — [Crossref](https://api.crossref.org/works/10.1016/0191-8869(95)00086-L)
- Abstract not retrievable (ScienceDirect 403; S2/OpenAlex abstract elided). Item count (commonly 11) and factor names (rank, attractiveness, group fit): unverified.

**23. Yu, M., & Cingel, D. P. (2025). The development and validation of measurement scales of upward state social comparison on social media. *Behavioral Sciences, 15*(6), 743. https://doi.org/10.3390/bs15060743**
- Study type: scale development + validation study. PMID 40564525. Europe PMC cites 1 (2026-09-21). — [Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.3390/bs15060743&resultType=core&format=json)
- "The final sample size was 462 participants, with ages ranging from 18 to 42 years old, (M_age = 19.75, SD_age = 2.09) ... 349 females (75.54%), 105 males (22.73%)". "a 4-item scale of measuring ability-based assimilative upward state social comparison and a 4-item scale of measuring ability-based contrastive upward state social comparison demonstrated good reliability, convergent validity, divergent validity, and predictive validity." — same source.
- Useful because it distinguishes *assimilative* (inspiring) from *contrastive* (deflating) upward comparison, matching the contrast finding in McComb et al. (2023).

- Other social-media-specific measures: In Steers et al. (2014) comparison direction on Facebook was measured with adapted items in a daily diary; in Pryde & Prichard (2022) and Fardouly et al. (2015) *state appearance comparison* was measured after exposure. A widely used dedicated SNS comparison scale earlier than 2025 was not identified within the call budget (Crossref bibliographic search returned only unrelated preprints/scales). — [Crossref search](https://api.crossref.org/works?query.bibliographic=social+comparison+social+media+scale+development+validation&rows=8)

### Inferences
- For a student project on Vietnamese university students, the INCOM (trait orientation) plus a state upward-comparison scale (Yu & Cingel, 2025) would cover both "who compares" and "what happens when they compare".

### Gaps
- Full psychometrics (item counts, alphas) for INCOM and the Allan & Gilbert scale are not confirmable from open abstracts.
- Vietnamese-language validations of these scales were out of scope and not searched.

## Brief note: the Twenge vs Orben & Przybylski causality debate (covered in depth elsewhere)

- **Twenge, J. M., Joiner, T. E., Rogers, M. L., & Martin, G. N. (2018). Increases in depressive symptoms, suicide-related outcomes, and suicide rates among U.S. adolescents after 2010 and links to increased new media screen time. *Clinical Psychological Science, 6*(1), 3–17. https://doi.org/10.1177/2167702617723376** (online 14 Nov 2017; print issue January 2018). Two nationally representative surveys, N = 506,820, grades 8–12; more time on new media associated with more mental-health issues; authors argue screen time "may account for the increases in depression and suicide". Crossref cites 1302; S2 cites 1470; OpenAlex cites 1713 (2026-09-21). — [OpenAlex](https://api.openalex.org/works/doi:10.1177/2167702617723376); [Crossref](https://api.crossref.org/works/10.1177/2167702617723376)
- **Orben, A., & Przybylski, A. K. (2019). The association between adolescent well-being and digital technology use. *Nature Human Behaviour, 3*(2), 173–182. https://doi.org/10.1038/s41562-018-0506-1** Specification-curve analysis of large datasets concluding the association is very small (variance explained figure not retrievable from abstract; commonly cited as ≤0.4% — unverified). Crossref cites 1106; S2 cites 1233; OpenAlex cites 1525 (2026-09-21). — [Crossref](https://api.crossref.org/works/10.1038/s41562-018-0506-1)
- Relevance here: the debate concerns *screen time*; the social-comparison literature (Yoon et al., 2019; McComb et al., 2023) argues that the mechanism variable (comparison) shows larger effects than time, which partly reconciles the two positions.

## Quick reference table

| # | Source (year) | Type | N / k | Key number | DOI |
|---|---|---|---|---|---|
| 1 | Yoon et al. (2019) | Meta-analysis | k=33/12/5; N=15,881 / 8,041 / 1,715 & 2,298 | upward comparison–depression: medium; time: small | 10.1016/j.jad.2019.01.026 |
| 2 | McComb et al. (2023) | Meta-analysis (experiments) | 48 articles, 7,679 pp, 118 ES | g=−0.24 overall; body image g=−0.31; self-esteem g=−0.21 | 10.1080/15213269.2023.2180647 |
| 3 | Saiphoo & Vahedi (2019) | Meta-analysis | 63 samples, N=36,552 | r=0.169 [0.131, 0.206] | 10.1016/j.chb.2019.07.028 |
| 4 | Huang (2017) | Meta-analysis | 61 studies, 67 samples, N=19,652 | r=−0.07 | 10.1089/cyber.2016.0758 |
| 5 | Meier & Reinecke (2021) | Meta-review | 34 reviews, 594 pubs | "small negative association" | 10.1177/0093650220958224 |
| 6 | Fardouly & Vartanian (2016) | Review | — | comparison mediates; brief own-feed exposure no effect | 10.1016/j.copsyc.2015.09.005 |
| 7 | Appel et al. (2016) | Review | — | passive use → comparison/envy → depression | 10.1016/j.copsyc.2015.10.006 |
| 8 | Verduyn et al. (2017) | Review | — | passive use negative; active positive | 10.1111/sipr.12033 |
| 9 | Verduyn et al. (2020) | Review | — | contrasting upward comparison typical | 10.1016/j.copsyc.2020.04.002 |
| 10 | Vogel et al. (2014) | Survey + experiment | unverified | upward comparison → lower self-esteem (details unverified) | 10.1037/ppm0000047 |
| 11 | Chou & Edge (2012) | Survey | N=425 | longer/more FB use → "others are happier" | 10.1089/cyber.2011.0324 |
| 12 | Steers et al. (2014) | Survey + 14-day diary | N=180; N=152 | upward, nondirectional AND downward comparison mediate | 10.1521/jscp.2014.33.8.701 |
| 13 | Feinstein et al. (2013) | Longitudinal | unverified | negative comparison → depression via rumination (unverified) | 10.1037/a0033111 |
| 14 | Kross et al. (2013) | Experience sampling | N=79 (82 recruited) | B=.08 affect; β=−.124 life satisfaction | 10.1371/journal.pone.0069841 |
| 15 | Verduyn et al. (2015) | Experiment + ESM | unverified | passive use → envy → lower affect | 10.1037/xge0000057 |
| 16 | Tromholt (2016) | RCT, 1 week | N=1,095 | break raises life satisfaction & positive emotion | 10.1089/cyber.2016.0259 |
| 17 | Hunt et al. (2018) | RCT, 3 weeks | N=143 | 10 min/platform/day → lower loneliness & depression | 10.1521/jscp.2018.37.10.751 |
| 18 | Fardouly et al. (2015) | Experiment | N=112 | FB → worse mood; discrepancies only in high comparers | 10.1016/j.bodyim.2014.12.002 |
| 19 | Sherlock & Wagstaff (2019) | Survey + experiment | unverified | Instagram frequency ↔ wellbeing via comparison (unverified) | 10.1037/ppm0000182 |
| 20 | Pryde & Prichard (2022) | Experiment | N=120 | TikTok fitspo → state comparison → body dissatisfaction/mood | 10.1016/j.bodyim.2022.09.004 |
| 21 | Gibbons & Buunk (1999) | Scale development | "several thousand" per country | INCOM | 10.1037/0022-3514.76.1.129 |
| 22 | Allan & Gilbert (1995) | Scale development | unverified | Social Comparison Rating Scale | 10.1016/0191-8869(95)00086-L |
| 23 | Yu & Cingel (2025) | Scale development | N=462 | two 4-item upward state comparison scales | 10.3390/bs15060743 |
