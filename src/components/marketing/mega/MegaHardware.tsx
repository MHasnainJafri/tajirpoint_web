import { MegaGrid, MegaFeat, MegaCols, MegaCol, MegaIconGrid, MegaIconTile, MegaList, I } from "./MegaShell";

export function MegaHardware() {
  return (
    <MegaGrid>
      <MegaFeat
        pill="📦 Bundle · Rs 28,000"
        heading="Kiryana Counter Kit"
        description="Scanner + 80mm thermal printer + cash drawer. Plug-and-play. Ships free across Pakistan."
        cta="View bundle"
        arabic="28k"
      />
      <div>
        <MegaCols>
          <MegaCol heading="Hardware">
            <MegaIconGrid>
              <MegaIconTile
                name="Barcode scanners"
                sub="1D / 2D · USB · BLE"
                icon={
                  <I>
                    <rect x="3" y="6" width="18" height="12" rx="2" />
                    <path d="M7 6v12M11 6v12M15 6v12" />
                  </I>
                }
              />
              <MegaIconTile
                name="Thermal printers"
                sub="All standard receipt printers"
                icon={
                  <I>
                    <path d="M6 9V4h12v5" />
                    <rect x="2" y="9" width="20" height="9" rx="2" />
                    <rect x="6" y="14" width="12" height="8" />
                  </I>
                }
              />
              <MegaIconTile
                name="Cash drawers"
                sub="Kick-out · USB"
                icon={
                  <I>
                    <rect x="2" y="7" width="20" height="11" rx="1" />
                    <path d="M2 11h20M7 14h2" />
                  </I>
                }
              />
              <MegaIconTile
                name="Customer displays"
                sub="Display-2 / serial"
                icon={
                  <I>
                    <rect x="3" y="5" width="18" height="11" rx="2" />
                    <path d="M8 20h8M12 16v4" />
                  </I>
                }
              />
            </MegaIconGrid>
          </MegaCol>
          <MegaCol heading="Bundles">
            <MegaList
              items={[
                { label: "Kiryana counter kit", small: "Rs 28,000" },
                { label: "Restaurant station kit", small: "Rs 64,000" },
                { label: "Retail register kit", small: "Rs 48,000" },
                { label: "Driver mobile kit", small: "Rs 18,000" },
              ]}
            />
          </MegaCol>
          <MegaCol heading="Resources">
            <MegaList
              items={[
                { label: "Tested device list" },
                { label: "Driver setup guides" },
                { label: "Bluetooth pairing" },
                { label: "Network printer setup" },
              ]}
            />
          </MegaCol>
        </MegaCols>
      </div>
    </MegaGrid>
  );
}
