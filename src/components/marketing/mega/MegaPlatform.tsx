import { MegaGrid, MegaFeat, MegaCols, MegaCol, MegaIconGrid, MegaIconTile, MegaList, I } from "./MegaShell";

export function MegaPlatform() {
  return (
    <MegaGrid>
      <MegaFeat
        pill="⚡ v2026.05"
        pillBg="var(--color-mint)"
        pillFg="var(--color-ink)"
        heading="Khata + Aging buckets, free in every plan."
        description="Statements of account in three languages. Payment reminders over WhatsApp."
        cta="View what's new"
        arabic="تاجر"
        bgClass="bg-gradient-to-br from-[#0a2a20] to-[#052017]"
        textOverride="text-white"
        visBg="radial-gradient(circle at 30% 30%, var(--color-mint) 0%, transparent 70%)"
      />
      <div>
        <MegaCols>
          <MegaCol heading="Surfaces">
            <MegaIconGrid>
              <MegaIconTile
                name="Tajir Point"
                sub="Offline-first POS"
                icon={
                  <I>
                    <rect x="2" y="4" width="20" height="14" rx="2" />
                    <path d="M8 22h8M12 18v4" />
                  </I>
                }
              />
              <MegaIconTile
                name="Tajir Backend"
                sub="ERP & API"
                icon={
                  <I>
                    <path d="M3 7h18M3 12h18M3 17h18" />
                  </I>
                }
              />
              <MegaIconTile
                name="Storefront"
                sub="Customer site"
                icon={
                  <I>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2c3 4 3 16 0 20M12 2c-3 4-3 16 0 20" />
                  </I>
                }
              />
              <MegaIconTile
                name="Driver App"
                sub="Dispatch & POD"
                icon={
                  <I>
                    <circle cx="6" cy="17" r="3" />
                    <circle cx="17" cy="17" r="3" />
                    <path d="M2 5h11l3 12M14 8h6l1 5" />
                  </I>
                }
              />
            </MegaIconGrid>
          </MegaCol>
          <MegaCol heading="Sell">
            <MegaList
              items={[
                { label: "Point of Sale" },
                { label: "Restaurant POS & KDS" },
                { label: "Quotations & Sales orders" },
                { label: "Online ordering" },
                { label: "Promotions & loyalty" },
              ]}
            />
          </MegaCol>
          <MegaCol heading="Manage">
            <MegaList
              items={[
                { label: "Inventory & warehouses" },
                { label: "Khata & ledgers" },
                { label: "Purchases & GRN" },
                { label: "Accounting & tax" },
                { label: "Dispatch & POD" },
                { label: "Reports & KPIs" },
              ]}
            />
          </MegaCol>
        </MegaCols>
      </div>
    </MegaGrid>
  );
}
