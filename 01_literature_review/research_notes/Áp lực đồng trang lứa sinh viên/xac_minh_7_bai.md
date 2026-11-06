# Xác minh 7 tài liệu tham khảo — Đề tài "Áp lực đồng trang lứa ở sinh viên"

**Ngày xác minh: 20/09/2026**
**Nguyên tắc: mọi con số dưới đây đều lấy từ một trang đã mở thật. Chỗ nào không mở được → ghi rõ "chặn truy cập" hoặc "chưa xác minh". Không suy đoán.**

Nguồn dữ liệu được dùng (ghi rõ cho từng số):
- **GS** = Google Scholar (scholar.google.com) — truy cập được cho mục 1–5, **bị CAPTCHA chặn** khi tới mục 6–7 (KHÔNG giải CAPTCHA theo đúng yêu cầu).
- **OA** = OpenAlex API (api.openalex.org) — `cited_by_count`.
- **CR** = Crossref API (api.crossref.org) — `is-referenced-by-count` + metadata thư mục.
- **PMC** = PubMed Central (bản toàn văn).
- **VJOL** = vjol.info.vn (metadata Highwire `citation_*` trích trực tiếp từ HTML).
- **SCImago gốc (scimagojr.com) trả HTTP 403 cho MỌI truy vấn** → quartile lấy từ nguồn phản chiếu dữ liệu SJR (Resurchify / Editage / Researcher.Life) và được ghi chú rõ.

---

## 1. Giletta và cộng sự (2021) — Psychological Bulletin

**Trích dẫn APA 7 đã kiểm:**
> Giletta, M., Choukas-Bradley, S., Maes, M., Linthicum, K. P., Card, N. A., & Prinstein, M. J. (2021). A meta-analysis of longitudinal peer influence effects in childhood and adolescence. *Psychological Bulletin, 147*(7), 719–747. https://doi.org/10.1037/bul0000329

| Mục | Kết quả | Nguồn |
|---|---|---|
| a) Số trích dẫn | **338** ("Trích dẫn 338 bài viết") | **Google Scholar**, 20/09/2026 |
| a) Đối chiếu | 198 | **OpenAlex** |
| b) Tác giả | Matteo Giletta; Sophia Choukas-Bradley; Marlies Maes; Kathryn P. Linthicum; Noel A. Card; Mitchell J. Prinstein — **6 tác giả, khớp 100% với danh sách sinh viên đang dùng** | OpenAlex |
| c) Tập/số/trang/năm | Vol **147**, issue **7**, tr. **719–747**, năm **2021** (ngày xuất bản 01/07/2021) — **khớp hoàn toàn** | OpenAlex `biblio` |
| d) Quartile SJR | **Q1** — *Psychology (miscellaneous)* Q1; *History and Philosophy of Science* Q1. SJR 8.496, h-index 396, NXB American Psychological Association | Resurchify (phản chiếu SJR); SCImago gốc 403 |
| e) Link | https://doi.org/10.1037/bul0000329 | — |

**URL Google Scholar:** https://scholar.google.com/scholar?q=%22A+meta-analysis+of+longitudinal+peer+influence+effects+in+childhood+and+adolescence%22

> ⚠️ Lưu ý cho sinh viên: GS (338) cao hơn OpenAlex (198) là bình thường — Google Scholar đếm cả luận văn, sách, preprint; OpenAlex chỉ đếm nguồn có DOI. **Dùng số GS nếu bài yêu cầu "lượt trích dẫn Google Scholar", và phải ghi rõ ngày truy cập.**

---

## 2. Auerbach và cộng sự (2018) — Journal of Abnormal Psychology

**Trích dẫn APA 7 đã kiểm (ĐẦY ĐỦ TÁC GIẢ — đây là chỗ bản nháp đang thiếu):**
> Auerbach, R. P., Mortier, P., Bruffaerts, R., Alonso, J., Benjet, C., Cuijpers, P., Demyttenaere, K., Ebert, D. D., Green, J. G., Hasking, P., Murray, E., Nock, M. K., Pinder-Amaker, S., Sampson, N. A., Stein, D. J., Vilagut, G., Zaslavsky, A. M., & Kessler, R. C. (2018). WHO World Mental Health Surveys International College Student Project: Prevalence and distribution of mental disorders. *Journal of Abnormal Psychology, 127*(7), 623–638. https://doi.org/10.1037/abn0000362

| Mục | Kết quả | Nguồn |
|---|---|---|
| a) Số trích dẫn | **3.938** ("Trích dẫn 3938 bài viết") | **Google Scholar**, 20/09/2026 |
| a) Đối chiếu | 2.548 (OpenAlex) / 2.117 (Crossref) | OpenAlex, Crossref |
| b) Tác giả | **18 tác giả** theo đúng thứ tự in trên bài (xem trích dẫn trên) | **PMC6193834** (bản toàn văn) |
| c) Tập/số/trang/năm | Vol **127**, issue **7**, tr. **623–638**, năm **2018** — **khớp hoàn toàn** | Crossref + PMC |
| d) Quartile SJR | Tạp chí *Journal of Abnormal Psychology* đã **đổi tên thành Journal of Psychopathology and Clinical Science từ 2022**. Bản mới: **Q1 (2024)**, SJR 1.236, NXB APA. Bản cũ (JAP) Resurchify hiển thị quartile "–" vì đã ngừng dưới tên đó. Lĩnh vực: Clinical Psychology; Psychiatry and Mental Health; Biological Psychiatry; Developmental and Educational Psychology | Resurchify; SCImago gốc 403 |
| e) Link | https://doi.org/10.1037/abn0000362 — **toàn văn miễn phí: https://pmc.ncbi.nlm.nih.gov/articles/PMC6193834/** | — |

**URL Google Scholar:** https://scholar.google.com/scholar?q=%22WHO+World+Mental+Health+Surveys+International+College+Student+Project%3A+Prevalence+and+distribution+of+mental+disorders%22

> ⚠️ **Khác biệt quan trọng:** Crossref và OpenAlex chèn thêm mục "WHO WMH-ICS Collaborators" vào **vị trí thứ 2** của danh sách tác giả. Đó là **lỗi metadata**. Bản in thật (PMC) có 18 tác giả cá nhân, còn nhóm WMH-ICS Collaborators chỉ xuất hiện ở phần ghi chú "on behalf of". **Không chép danh sách từ Crossref/OpenAlex — dùng danh sách PMC ở trên.**
> APA 7 cho ≥21 tác giả mới cần dùng dấu "…"; bài này 18 tác giả nên **liệt kê đủ cả 18**, dấu `&` trước tên cuối.

---

## 3. Steinberg & Monahan (2007) — Developmental Psychology

**Trích dẫn APA 7 đã kiểm:**
> Steinberg, L., & Monahan, K. C. (2007). Age differences in resistance to peer influence. *Developmental Psychology, 43*(6), 1531–1543. https://doi.org/10.1037/0012-1649.43.6.1531

| Mục | Kết quả | Nguồn |
|---|---|---|
| a) Số trích dẫn | **2.666** ("Trích dẫn 2666 bài viết") | **Google Scholar**, 20/09/2026 |
| a) Đối chiếu | 1.572 | OpenAlex |
| b) Tác giả | Laurence Steinberg; Kathryn C. Monahan — **2 tác giả, khớp** | OpenAlex |
| c) Tập/số/trang/năm | Vol **43**, issue **6**, tr. **1531–1543**, năm **2007** (01/11/2007) — **khớp hoàn toàn** | OpenAlex `biblio` |
| d) Quartile SJR | **Q1** — *Developmental and Educational Psychology* Q1; *Demography* Q1; *Life-span and Life-course Studies* Q1. SJR 1.567, h-index 256, IF 3.1 (2024), NXB APA | Resurchify / Researcher.Life; SCImago gốc 403 |
| e) Link | https://doi.org/10.1037/0012-1649.43.6.1531 — **toàn văn miễn phí: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2779518/** | OpenAlex `oa_url` |

**URL Google Scholar:** https://scholar.google.com/scholar?q=%22Age+differences+in+resistance+to+peer+influence%22+Steinberg+Monahan

---

## 4. Borsari & Carey (2003) — Journal of Studies on Alcohol

**Trích dẫn APA 7 đã kiểm:**
> Borsari, B., & Carey, K. B. (2003). Descriptive and injunctive norms in college drinking: A meta-analytic integration. *Journal of Studies on Alcohol, 64*(3), 331–341. https://doi.org/10.15288/jsa.2003.64.331

| Mục | Kết quả | Nguồn |
|---|---|---|
| a) Số trích dẫn | **1.759** ("Trích dẫn 1759 bài viết") | **Google Scholar**, 20/09/2026 |
| a) Đối chiếu | 1.224 | OpenAlex |
| b) Tác giả | Brian Borsari; Kate B. Carey — **2 tác giả, khớp** | OpenAlex |
| c) Tập/số/trang/năm | Vol **64**, issue **3**, tr. **331–341**, năm **2003** (01/05/2003) — **khớp hoàn toàn** | OpenAlex `biblio` |
| d) Quartile SJR | Tạp chí *Journal of Studies on Alcohol* **đã ngừng năm 2006**, tiếp nối là *Journal of Studies on Alcohol and Drugs* (JSAD, phạm vi 2007–2025): **Q1**, SJR 0.838, h-index 141. Lĩnh vực: Medicine (miscellaneous) / Toxicology / Psychiatry and Mental Health. Quartile riêng cho tên cũ năm 2003: **chưa xác minh** (SCImago gốc 403) | Resurchify |
| e) Link | https://doi.org/10.15288/jsa.2003.64.331 — **toàn văn miễn phí: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2431131/** | OpenAlex `oa_url` |

**URL Google Scholar:** https://scholar.google.com/scholar?q=%22Descriptive+and+injunctive+norms+in+college+drinking%22+Borsari+Carey

---

## 5. Xiong và cộng sự — Journal of Youth and Adolescence ⚠️ SỬA NĂM

### ❗ Kết luận về mâu thuẫn năm: **phải ghi (2026), KHÔNG phải (2025)**

Bằng chứng (Crossref, bản ghi chính thức của NXB):
- `published-online`: **2025-08-04** (bản online-first)
- `published-print`: **2026-01** ← số tạp chí chính thức
- Tập 55, số 1 của *Journal of Youth and Adolescence* là **số tháng 01/2026**
- Google Scholar cũng hiển thị năm **2026**

Theo **APA 7**, khi bài đã được gán vào số tạp chí hoàn chỉnh (có tập/số/trang), phải trích dẫn theo **năm của số tạp chí**, không dùng năm online-first. Vì hôm nay là 20/09/2026, số tháng 01/2026 đã phát hành → **dùng 2026**.
(Chuỗi "025" trong DOI `10.1007/s10964-025-02232-6` chỉ là mã hậu tố do NXB cấp lúc nhận bài — **không phải năm xuất bản**, đừng để bị đánh lừa.)

**Trích dẫn APA 7 đã kiểm (bản ĐÚNG):**
> Xiong, S., Xu, Y., Xiong, G., & Zhang, B. (2026). Social media use intensity and social media use problems in relation to interpersonal adaptation during the transition to college: An intensive longitudinal study. *Journal of Youth and Adolescence, 55*(1), 106–118. https://doi.org/10.1007/s10964-025-02232-6

| Mục | Kết quả | Nguồn |
|---|---|---|
| a) Số trích dẫn | **5** ("Trích dẫn 5 bài viết"), năm hiển thị 2026 | **Google Scholar**, 20/09/2026 |
| a) Đối chiếu | 4 (OpenAlex) / 4 (Crossref) | OpenAlex, Crossref |
| b) Tác giả | Sicheng Xiong; Yi Xu; Ge Xiong; Bin Zhang — **4 tác giả, khớp** (chữ viết tắt S., Y., G., B. là đúng) | Crossref + OpenAlex |
| c) Tập/số/trang/năm | Vol **55**, issue **1**, tr. **106–118** — khớp. **Năm: sửa 2025 → 2026** | Crossref |
| c) Tiêu đề đầy đủ | Bản nháp đang **thiếu phần phụ đề**: "…: An Intensive Longitudinal Study" — phải bổ sung | Crossref |
| d) Quartile SJR | **Q1 cả 4 lĩnh vực** — *Developmental and Educational Psychology* Q1; *Education* Q1; *Social Psychology* Q1; *Social Sciences (miscellaneous)* Q1. SJR 1.893, h-index 165, NXB Springer New York | Resurchify; SCImago gốc 403 |
| e) Link | https://doi.org/10.1007/s10964-025-02232-6 (**không open access** — OpenAlex `oa_url` = None; link Springer chuyển hướng qua trang đăng nhập) | OpenAlex |

**URL Google Scholar:** https://scholar.google.com/scholar?q=%22Social+Media+Use+Intensity+and+Social+Media+Use+Problems+in+Relation+to+Interpersonal+Adaptation%22

---

## 6. Đặng Thị Hồng Nhung (2024) — Tạp chí Khoa học Đại học Văn Lang

**Trích dẫn APA 7 đã kiểm:**
> Đặng Thị Hồng Nhung. (2024). Thích ứng thang đo áp lực đồng trang lứa (TTQ) trên nhóm sinh viên Trường Đại học Văn Lang. *Tạp chí Khoa học Đại học Văn Lang, 8*(46(04)), 124. https://www.vjol.info.vn/index.php/tckhvl/article/view/108101

| Mục | Kết quả | Nguồn |
|---|---|---|
| a) Số trích dẫn | **Google Scholar: chặn truy cập, chưa lấy được** (CAPTCHA "Hãy thể hiện rằng bạn không phải là rô-bốt" — đã dừng, không giải theo đúng yêu cầu) | — |
| a) Dự phòng | **Không có trong CSDL nào**: OpenAlex không có bản ghi bài; Crossref không có (bài **không có DOI**); Semantic Scholar không tra được. → **Số trích dẫn: chưa xác minh (nhiều khả năng bằng 0 hoặc rất thấp)** | OpenAlex API, Crossref |
| b) Tác giả | **Chỉ 1 tác giả duy nhất**: `citation_author = Nhung Đặng Thị Hồng` → trong văn bản tiếng Việt viết **Đặng Thị Hồng Nhung**. Tên tiếng Việt đầy đủ **không viết tắt** trong danh mục tài liệu tiếng Việt | **VJOL** metadata `citation_author` |
| c) Tập/số/trang/năm | `citation_volume = 8`; `citation_issue = (46)04`; `citation_date = 2024`; `citation_firstpage = 124`; `citation_lastpage = 124`; ISSN **2525-2429** | **VJOL** metadata Highwire |
| c) Trang | **Trang bắt đầu: 124**. Trang kết thúc **chưa xác minh** — metadata VJOL ghi `firstpage = lastpage = 124` (nhập thiếu), và bản PDF/galley **không được công khai trên VJOL**. Nếu cần trang cuối chính xác, phải mở bản in hoặc trang gốc của Trường ĐH Văn Lang | VJOL |
| c) Ghi chú | Trang VJOL ghi ngày đăng lên hệ thống là **11/02/2025**, nhưng `citation_date` và số tạp chí đều là **2024** → **giữ năm 2024** | VJOL |
| d) Quartile SJR | **Không có** — tạp chí không nằm trong Scopus nên không có SJR/quartile | Xem mục kiểm tra bổ sung bên dưới |
| e) Link | https://www.vjol.info.vn/index.php/tckhvl/article/view/108101 (chuyển hướng tới https://www.vjol.info.vn/tckhvl/vi/article/view/108101/) — **mở được, có tóm tắt + từ khóa, không có PDF tải về** | Đã mở trực tiếp |

**Từ khóa (dùng được cho phần lược khảo):** sinh viên; áp lực đồng trang lứa; thang đo TTQ-V; thực trạng áp lực đồng trang lứa
**Tóm tắt phương pháp (đã đọc trên trang):** thích ứng thang đo Tough Turf peer pressure (TTQ); pilot n = 72 (α = 0.88); khảo sát chính n = 501 sinh viên ĐH Văn Lang (α = 0.87); bản Việt hóa TTQ-V gồm **17 item, 4 thành tố** (hành vi nhóm; đánh giá nhóm; trào lưu nhóm; thói quen nhóm); hồi quy F = 944.341, R² = 0.88.

---

## 7. Pham Thi và cộng sự (2025) — International Journal of Educational Management

**Trích dẫn APA 7 đã kiểm:**
> Pham Thi, H., Tran, V. A., Tran, P. A., & Nguyen, T. T. H. (2025). Impact of peer pressure on student's university choice: The case study in Vietnam. *International Journal of Educational Management, 39*(4), 1045–1060. https://doi.org/10.1108/IJEM-02-2024-0106

| Mục | Kết quả | Nguồn |
|---|---|---|
| a) Số trích dẫn | **Google Scholar: chặn truy cập, chưa lấy được** (CAPTCHA, đã dừng theo đúng yêu cầu) | — |
| a) Dự phòng | **0** (Crossref `is-referenced-by-count`) và **0** (OpenAlex `cited_by_count`) → bài mới, **chưa có trích dẫn** | **Crossref + OpenAlex** |
| b) Tác giả | Pham Thi, Huyen; Tran, Viet An; Tran, Phuong An; Nguyen, Thi Thu Ha — **4 tác giả, khớp với bản nháp**. Viết tắt đúng: H.; V. A.; P. A.; T. T. H. | **Crossref** (trường `family`/`given` tách sẵn) |
| c) Tập/số/trang/năm | Vol **39**, issue **4**, tr. **1045–1060** — **khớp**. `published-online` 30/05/2025; `published-print` **25/06/2025** → **năm 2025 là đúng**, không có mâu thuẫn như mục 5 | **Crossref** |
| d) Quartile SJR | **Có mâu thuẫn giữa các nguồn phản chiếu, SCImago gốc 403 nên chưa chốt được:** Resurchify ghi **Q2** (*Education* Q2; *Organizational Behavior and Human Resource Management* Q2), SJR 0.68, h-index 69; Editage ghi **Q3** (*Education*), CiteScore 2.7, SNIP 1.11. → Ghi là **Q2–Q3 ngành Education, chưa xác minh trực tiếp trên SCImago**. Khác biệt do dữ liệu hai nguồn thuộc hai năm khác nhau | Resurchify, Editage |
| e) Link | https://doi.org/10.1108/IJEM-02-2024-0106 (**không open access** — OpenAlex `oa_url` = None; trang Emerald trả 403 với truy cập tự động) | OpenAlex |

> ⚠️ Lỗi chính tả cần sửa trong bản nháp: tiêu đề dùng dấu nháy đơn cong `student's` (U+2019). Crossref lưu ký tự này bị lỗi mã hóa. Khi gõ lại nhớ dùng đúng `student's`.

---

## ✅ KIỂM TRA BỔ SUNG: Mục 6 và 7 có phải "bài báo uy tín" không?

### Mục 7 — *International Journal of Educational Management* (Emerald) → **ĐỦ SỨC BẢO VỆ**

| Tiêu chí | Kết quả | Nguồn |
|---|---|---|
| **Scopus** | ✅ **CÓ** — có mã nguồn Scopus (sid 144741), có CiteScore 2.7 và SJR (chỉ số SJR chỉ tính cho tạp chí trong Scopus) | Editage (nêu rõ "indexed in Web of Science, Scopus, and SJR"); SCImago có trang riêng cho tạp chí |
| **Web of Science** | ✅ **CÓ, nhưng ở ESCI** (Emerging Sources Citation Index) — **KHÔNG thuộc SSCI**. ESCI nằm trong WoS Core Collection nhưng **không có Impact Factor chính thức của JCR** | Kết quả tìm kiếm tổng hợp (journalsearches.com, wos-journal.info); trang Emerald gốc trả 403 |
| **Danh mục khác** | ABDC, UGC CARE | Như trên |
| **HĐGSNN** | Không áp dụng — đây là tạp chí quốc tế, được tính điểm qua kênh Scopus/WoS chứ không qua danh mục tạp chí trong nước | — |

**👉 Kết luận mục 7:** Hoàn toàn hợp lệ để gọi là "bài báo uy tín". Cách diễn đạt an toàn nhất trong bài: *"đăng trên tạp chí thuộc danh mục Scopus (Q2–Q3 ngành Education) và Web of Science – ESCI"*. **Đừng viết "SSCI" hay "có Impact Factor JCR"** — sẽ sai.

### Mục 6 — *Tạp chí Khoa học Đại học Văn Lang* (ISSN 2525-2429) → **CẦN DIỄN ĐẠT CẨN THẬN**

| Tiêu chí | Kết quả | Nguồn |
|---|---|---|
| **Scopus** | ❌ **KHÔNG** — tra ISSN 2525-2429 trong OpenAlex sources trả về **HTTP 404 (không tồn tại bản ghi tạp chí)**. Đối chiếu: cả 5 ISSN quốc tế còn lại đều tra ra bình thường → 404 này là kết quả thật, không phải lỗi mạng. Không có trang SCImago, không có SJR, không có quartile | **OpenAlex API** `/sources/issn:2525-2429` |
| **Web of Science** | ❌ **KHÔNG** — không xuất hiện trong bất kỳ danh mục WoS nào tìm được | Tìm kiếm web |
| **DOI** | ❌ Bài **không có DOI** → không có bản ghi Crossref | Crossref |
| **HĐGSNN** | ⚠️ **CHƯA XÁC MINH** — cổng tra cứu hdgsnn.gov.vn trả **HTTP 404** ở đường dẫn tra cứu tạp chí; không mở được danh mục kèm Quyết định 25/QĐ-HĐGSNN (2024) hay 26/QĐ-HĐGSNN (2025) để đối chiếu ISSN 2525-2429. **Không tự suy đoán.** | hdgsnn.gov.vn (404) |

**👉 Kết luận mục 6:** Đây là **tạp chí khoa học trong nước có phản biện, có ISSN hợp lệ (2525-2429), có giấy phép báo chí**, nhưng **không thuộc Scopus, không thuộc Web of Science**.

**Cách sinh viên nên biện luận (trung thực và vẫn thuyết phục):**
- ✅ Nên viết: *"nghiên cứu trong nước đăng trên tạp chí khoa học có phản biện của Trường Đại học Văn Lang (ISSN 2525-2429), cung cấp công cụ đo lường đã được Việt hóa và kiểm định độ tin cậy trên chính đối tượng sinh viên Việt Nam"*.
- ✅ Điểm mạnh thật sự của bài này **không phải** chỉ số tạp chí, mà là **giá trị phương pháp**: đây là thang đo TTQ-V đã thích ứng văn hóa Việt, cỡ mẫu 501, α = 0.87 — rất phù hợp nếu nhóm muốn tự đo lường áp lực đồng trang lứa.
- ❌ **Tuyệt đối không viết** "tạp chí quốc tế uy tín", "thuộc Scopus", "Q1/Q2" cho bài này.
- ⚠️ **Việc cần làm thêm:** vào hdgsnn.gov.vn tra thủ công ISSN 2525-2429 trong Danh mục tạp chí được tính điểm. Nếu có → được ghi thêm "tạp chí được HĐGSNN tính điểm". Nếu không → chỉ dùng cách diễn đạt ở trên.

---

## 📋 TỔNG HỢP NHANH — những chỗ BẮT BUỘC phải sửa trong bản nháp

| # | Lỗi | Cách sửa |
|---|---|---|
| **2** | Đang viết "Auerbach, R. P., et al." | Liệt kê **đủ 18 tác giả** (APA 7 chỉ rút gọn khi ≥21). Chép từ mục 2 ở trên — **không chép từ Crossref** vì Crossref chèn sai "WHO WMH-ICS Collaborators" vào vị trí thứ 2 |
| **5** | Ghi năm **2025** | Sửa thành **2026** (số tạp chí 55(1) là số tháng 01/2026) |
| **5** | Tiêu đề thiếu phụ đề | Thêm ": An Intensive Longitudinal Study" |
| **6** | Thiếu số trang | Thêm **tr. 124** (trang cuối chưa xác minh được) |
| **6** | Nguy cơ gọi nhầm là "uy tín quốc tế" | Diễn đạt lại theo hướng dẫn ở mục kiểm tra bổ sung |
| **7** | Nguy cơ ghi nhầm "SSCI" | Ghi đúng: **Scopus + WoS ESCI** (không phải SSCI) |

## ⚠️ Những gì KHÔNG lấy được (ghi để minh bạch)
- **Google Scholar** cho mục **6 và 7**: chặn bằng CAPTCHA. Đã dừng, không giải. Mục 7 có số dự phòng (0 — Crossref & OpenAlex); mục 6 không có CSDL nào ghi nhận.
- **scimagojr.com**: trả **HTTP 403 cho mọi truy vấn**, kể cả truy cập trực tiếp. Toàn bộ quartile trong tài liệu này lấy từ nguồn phản chiếu dữ liệu SJR và đã được ghi rõ nguồn từng dòng.
- **Trang Emerald (IJEM)** và **Springer (JYA)**: trả 403 / chuyển hướng đăng nhập → dùng Crossref + OpenAlex thay thế.
- **Trang cuối của bài mục 6**: metadata VJOL nhập thiếu, không có PDF công khai.
- **Semantic Scholar API**: trả HTTP 429 (quá tải) → đã thay bằng OpenAlex + Crossref.
