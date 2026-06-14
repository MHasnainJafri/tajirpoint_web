import {
  MegaGrid,
  MegaFeat,
  MegaCols,
  MegaCol,
  MegaIconGrid,
  MegaIconTile,
  MegaList,
  I,
} from "./MegaShell";

export function MegaSolutions() {
  return (
    <MegaGrid>
      <MegaFeat
        pill="⚡ What's new"
        heading="FBR submission, live in Pakistan."
        description="Sales transmit to Federal Board of Revenue in real time. POS-IRN, e-invoicing, audit trail."
        cta="Read announcement"
        arabic="FBR"
      />
      <div>
        <MegaCols>
          <MegaCol heading="By business type">
            <MegaIconGrid>
              <MegaIconTile
                name="General Retail"
                sub="Kiryana, apparel, hardware"
                icon={
                  <I>
                    <path d="M3 8l1.5-4h15L21 8M3 8h18v12H3z" />
                    <path d="M9 13h6" />
                  </I>
                }
              />
              <MegaIconTile
                name="Restaurants & Cafés"
                sub="Dine-in, takeaway, KDS"
                icon={
                  <I>
                    <path d="M3 11h18l-2 9H5l-2-9z" />
                    <path d="M8 11V6a4 4 0 018 0v5" />
                  </I>
                }
              />
              <MegaIconTile
                name="Electronics"
                sub="Serial-tracked, warranty"
                icon={
                  <I>
                    <rect x="6" y="2" width="12" height="20" rx="2" />
                    <path d="M11 19h2" />
                  </I>
                }
              />
              <MegaIconTile
                name="Digital Services"
                sub="Bookings, schedules"
                icon={
                  <I>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </I>
                }
              />
              <MegaIconTile
                name="Bakeries & Sweets"
                sub="Production, modifiers"
                icon={
                  <I>
                    <path d="M3 3l3 18h12l3-18" />
                    <path d="M5 8h14" />
                  </I>
                }
              />
              <MegaIconTile
                name="Distributors"
                sub="Routes, dispatch, POD"
                icon={
                  <I>
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="18" r="3" />
                    <path d="M2 4h3l3 11h11l3-9H7" />
                  </I>
                }
              />
            </MegaIconGrid>
          </MegaCol>
          <MegaCol heading="By region">
            <MegaList
              items={[
                { label: "Pakistan", small: "FBR · PKR" },
                { label: "UAE", small: "VAT · AED" },
                { label: "Saudi Arabia", small: "ZATCA · SAR" },
                { label: "Bangladesh", small: "Coming Q3", muted: true },
              ]}
            />
          </MegaCol>
          <MegaCol heading="By size">
            <MegaList
              items={[
                { label: "Single shop" },
                { label: "2–10 branches" },
                { label: "Franchise & chains" },
                { label: "Enterprise" },
                { label: "Migrating from another POS", muted: true },
              ]}
            />
          </MegaCol>
        </MegaCols>
      </div>
    </MegaGrid>
  );
}
