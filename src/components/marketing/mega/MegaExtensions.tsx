import { MegaGrid, MegaFeat, MegaCols, MegaCol, MegaIconGrid, MegaIconTile, MegaList, I } from "./MegaShell";

export function MegaExtensions() {
  return (
    <MegaGrid>
      <MegaFeat
        pill="⚡ Live"
        pillBg="#dc2127"
        pillFg="#fff"
        heading="JazzCash mobile wallet, at the counter and on web."
        description="Accept QR-based wallet payments instantly. Auto-reconciles to the till."
        cta="Install JazzCash"
        bgClass="bg-gradient-to-br from-[#fbe9e9] to-[#fce4ec]"
        visBg="radial-gradient(circle at 30% 30%, #dc2127 0%, transparent 70%)"
      />
      <div>
        <MegaCols>
          <MegaCol heading="Available now">
            <MegaIconGrid>
              <MegaIconTile
                iconBg="#dc2127"
                iconFg="#fff"
                name="JazzCash"
                sub="PK mobile wallet"
                icon={<strong className="text-[12px] font-bold">JC</strong>}
              />
              <MegaIconTile
                iconBg="var(--color-forest)"
                iconFg="#fff"
                name="FBR Submission"
                sub="Pakistan tax filing"
                icon={<strong className="text-[11px] font-bold">FBR</strong>}
              />
              <MegaIconTile
                name="Bulk Importer"
                sub="CSV / Excel migration"
                icon={
                  <I>
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </I>
                }
              />
              <MegaIconTile
                name="WhatsApp · Twilio"
                sub="Receipts & reminders"
                icon={
                  <I>
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </I>
                }
              />
            </MegaIconGrid>
          </MegaCol>
          <MegaCol heading="Payments · soon">
            <MegaList
              items={[
                { label: "Stripe", muted: true },
                { label: "1Link", muted: true },
                { label: "Easypaisa", muted: true },
                { label: "HBL Konnect", muted: true },
              ]}
            />
          </MegaCol>
          <MegaCol heading="Integrations">
            <MegaList
              items={[
                { label: "QuickBooks Online" },
                { label: "Shopify · Daraz" },
                { label: "Google Maps" },
                { label: "Amazon SES" },
                { label: "Slack & webhooks" },
              ]}
            />
          </MegaCol>
        </MegaCols>
      </div>
    </MegaGrid>
  );
}
