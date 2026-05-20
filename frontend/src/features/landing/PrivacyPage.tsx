import { useState } from "react";
import { type Lang } from "./i18n";
import { Header } from "./components/Header";

const policy = {
  zh: {
    title: "隱私權政策",
    updated: "最後更新：2025 年 1 月",
    intro:
      "Nivorae（以下簡稱「我們」）非常重視您的個人資料安全。本政策依據《個人資料保護法》說明我們如何蒐集、使用及保護您的個人資訊。",
    sections: [
      {
        heading: "一、蒐集的個人資料",
        body: "當您透過本站聯絡表單送出需求時，我們會蒐集以下資訊：\n• 姓名 / 聯絡人\n• 電子郵件地址\n• Line 名稱\n• 專案完成日期\n• 專案類型",
      },
      {
        heading: "二、蒐集目的",
        body: "我們蒐集上述資料的目的為：\n• 回覆您的諮詢需求\n• 提供初步報價與方案建議\n• 後續合作聯繫",
      },
      {
        heading: "三、資料使用方式",
        body: "您的個人資料僅供 Nivorae 團隊內部使用，用於處理您的需求與聯繫。我們不會將您的資料出售、出租或提供給任何第三方，除非依法律規定或您明確同意。",
      },
      {
        heading: "四、資料保存期限",
        body: "您的個人資料將保存至案件結束後 3 年，或依您的要求刪除，以較早者為準。",
      },
      {
        heading: "五、您的權利",
        body: "依《個人資料保護法》，您享有以下權利：\n• 查詢或閱覽您的個人資料\n• 請求製給複製本\n• 請求補充或更正\n• 請求停止蒐集、處理或利用\n• 請求刪除\n\n如需行使上述權利，請透過下方聯絡方式與我們聯繫。",
      },
      {
        heading: "六、資料安全",
        body: "我們採取合理的技術與管理措施保護您的個人資料，防止未經授權的存取、洩漏或濫用。",
      },
      {
        heading: "七、聯絡我們",
        body: "如對本隱私權政策有任何疑問，或欲行使個人資料相關權利，請透過以下方式聯繫：\n\nEmail：nivoraeinc@gmail.com",
      },
      {
        heading: "八、政策變更",
        body: "我們保留隨時修改本政策的權利，修改後將於本頁面公告。建議您定期查閱本政策以瞭解最新內容。",
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    updated: "Last updated: January 2025",
    intro:
      'Nivorae (hereinafter "we") takes your personal data seriously. This policy explains how we collect, use, and protect your personal information in accordance with Taiwan\'s Personal Data Protection Act (PDPA).',
    sections: [
      {
        heading: "1. Data We Collect",
        body: "When you submit an inquiry via our contact form, we collect the following:\n• Name / contact person\n• Email address\n• Line ID\n• Target project completion date\n• Project type",
      },
      {
        heading: "2. Purpose of Collection",
        body: "We collect this data to:\n• Respond to your inquiry\n• Provide an initial quote and service recommendation\n• Follow up on potential collaboration",
      },
      {
        heading: "3. How We Use Your Data",
        body: "Your personal data is used exclusively within the Nivorae team to handle your request. We do not sell, rent, or share your data with any third party, unless required by law or with your explicit consent.",
      },
      {
        heading: "4. Retention Period",
        body: "Your personal data is retained for 3 years after the conclusion of a project, or deleted upon your request — whichever comes first.",
      },
      {
        heading: "5. Your Rights",
        body: "Under Taiwan's PDPA, you have the right to:\n• Inquire about or access your personal data\n• Request a copy\n• Request correction or supplementation\n• Request suspension of collection, processing, or use\n• Request deletion\n\nTo exercise any of these rights, please contact us using the details below.",
      },
      {
        heading: "6. Data Security",
        body: "We implement reasonable technical and administrative measures to protect your personal data against unauthorised access, disclosure, or misuse.",
      },
      {
        heading: "7. Contact Us",
        body: "If you have any questions about this policy or wish to exercise your data rights, please reach out:\n\nEmail: nivoraeinc@gmail.com",
      },
      {
        heading: "8. Policy Updates",
        body: "We reserve the right to update this policy at any time. Changes will be published on this page. We recommend reviewing it periodically.",
      },
    ],
  },
};

export function PrivacyPage() {
  const [lang, setLang] = useState<Lang>("zh");
  const t = policy[lang];

  return (
    <>
      <Header lang={lang} onLangChange={setLang} />

      <main className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">{t.title}</h1>
          <p className="text-muted-foreground text-sm mb-12">{t.updated}</p>

          <p className="text-muted-foreground leading-relaxed mb-12">{t.intro}</p>

          <div className="space-y-10">
            {t.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-lg font-semibold mb-3">{s.heading}</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {s.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
