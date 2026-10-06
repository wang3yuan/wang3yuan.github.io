# 王三源 副教授 (Dr. San-Yuan Wang) 個人學術官方網站

> 臺北醫學大學 跨領域學院 / 藥學院  
> 專為 **GitHub Pages** 打造之零依賴、純靜態（Vanilla HTML5 + CSS3 + JavaScript）學術個人網頁。

---

## 🌟 網站特色

1. **零框架、零構建依賴**：完全無需安裝 Node.js、npm 或任何編譯工具，開箱即用。
2. **中英雙語即時切換**：點擊右上角 `EN / 中文` 按鈕即可無縫切換語言，並自動記憶訪客偏好。
3. **醫學科技藍 + 活力琥珀金（方案 A）**：展現臺北醫學大學智慧醫療之科技嚴謹性與設計思考活力。
4. **深色 / 淺色模式（Dark Mode）**：支援一鍵切換深淺模式，並會自動跟隨訪客系統設定。
5. **全平台響應式（RWD）**：手機、平板、高解析度螢幕皆自動完美排版。
6. **代表作即時篩選**：可依「智慧醫療與機器學習」、「計算質譜與代謝體學」、「轉譯體學與生物標記」分類過濾文獻。

---

## 📂 檔案結構

```text
藥物分析/
├── index.html       # 網頁主要內容與結構（含中英雙語文本）
├── style.css        # 現代視覺樣式、色彩主題與 RWD 排版
├── main.js          # 雙語切換、深淺色切換、篩選邏輯
└── README.md        # 本說明文件與 GitHub Pages 發佈指引
```

---

## 💻 本地預覽方法

### 方法一：直接點擊開啟
直接在您的 Mac Finder 中雙擊 `index.html`，即會自動在 Safari 或 Chrome 中開啟預覽。

### 方法二：透過輕量本地伺服器（推薦）
在終端機中進入本專案資料夾並執行：
```bash
python3 -m http.server 8000
```
接著在瀏覽器打開網址：`http://localhost:8000`

---

## 🚀 如何發佈到 GitHub Pages（簡易三步驟）

### 步驟 1：在 GitHub 上建立新儲存庫（Repository）
1. 登入您的 [GitHub 帳號](https://github.com/)。
2. 點擊右上角的 `+` 號，選擇 **New repository**。
3. 設定 Repository 名稱：
   * **個人主首頁**：命名為 `<您的GitHub帳號名稱>.github.io`（例如 `sywang.github.io`，網址將會是 `https://sywang.github.io/`）。
   * **一般專案頁面**：命名為任意名稱（例如 `academic-profile`，網址會是 `https://<您的帳號>.github.io/academic-profile/`）。
4. 選擇 **Public**（公開），其餘選項保持空白，點擊 **Create repository**。

### 步驟 2：將本機檔案推送到 GitHub
在終端機進入本專案目錄（`/Users/syw/Desktop/藥物分析`），依序執行以下指令：

```bash
git init
git add .
git commit -m "feat: 初版王三源副教授雙語個人學術網站"
git branch -M main
git remote add origin https://github.com/<您的GitHub帳號名稱>/<儲存庫名稱>.git
git push -u origin main
```

### 步驟 3：開啟 GitHub Pages
1. 進入該 GitHub 專案頁面，點擊上方的 **Settings**（設定）。
2. 在左側選單中點擊 **Pages**。
3. 在 **Build and deployment** > **Branch** 下方：
   * 將分支選為 `main`
   * 目錄選為 `/(root)`
   * 點擊 **Save**。
4. 等待約 1~2 分鐘，上方即會顯示綠色提示：  
   `Your site is live at https://<您的網址>`，恭喜網站正式上線！

---

## 📷 未來如何換上個人照片？

目前首頁個人名片採用優雅的幾何科技標誌（`SYW` 徽章），如果您之後想放上真實的照片：
1. 將照片命名為 `photo.jpg` 並放入本資料夾中。
2. 開啟 `index.html`，找到：
   ```html
   <div class="profile-avatar-circle">
     <div class="avatar-monogram">SYW</div>
     <div class="avatar-ring"></div>
   </div>
   ```
3. 替換為：
   ```html
   <div class="profile-avatar-circle">
     <img src="photo.jpg" alt="王三源 副教授" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">
     <div class="avatar-ring"></div>
   </div>
   ```
4. 重新 `git commit` 並 `git push` 即可自動更新！
