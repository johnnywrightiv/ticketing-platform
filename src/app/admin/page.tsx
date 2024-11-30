export default function AdminDashboard() {
  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Background and Foreground */}
        <div className="bg-background text-foreground border-border rounded-lg border p-4">
          <h2 className="text-xl font-bold">Background & Foreground</h2>
          <p>This shows the base background and text colors</p>
        </div>

        {/* Card */}
        <div className="bg-card text-card-foreground border-border rounded-lg border p-4">
          <h2 className="text-xl font-bold">Card</h2>
          <p>Card background and text colors</p>
        </div>

        {/* Popover */}
        <div className="bg-popover text-popover-foreground border-border rounded-lg border p-4">
          <h2 className="text-xl font-bold">Popover</h2>
          <p>Popover background and text</p>
        </div>

        {/* Primary */}
        <div className="bg-primary text-primary-foreground rounded-lg p-4">
          <h2 className="text-xl font-bold">Primary</h2>
          <p>Primary color with its foreground</p>
        </div>

        {/* Secondary */}
        <div className="bg-secondary text-secondary-foreground rounded-lg p-4">
          <h2 className="text-xl font-bold">Secondary</h2>
          <p>Secondary color with its foreground</p>
        </div>

        {/* Muted */}
        <div className="bg-muted text-muted-foreground rounded-lg p-4">
          <h2 className="text-xl font-bold">Muted</h2>
          <p>Muted color with its foreground</p>
        </div>

        {/* Accent */}
        <div className="bg-accent text-accent-foreground rounded-lg p-4">
          <h2 className="text-xl font-bold">Accent</h2>
          <p>Accent color with its foreground</p>
        </div>

        {/* Border and Input */}
        <div className="border-border rounded-lg border p-4">
          <h2 className="text-xl font-bold">Border</h2>
          <input
            type="text"
            placeholder="Input field"
            className="border-input w-full rounded-lg border p-2"
          />
        </div>

        {/* Ring */}
        <div className="ring-ring rounded-lg p-4 ring-2">
          <h2 className="text-xl font-bold">Ring</h2>
          <p>Shows the ring color (often used for focus states)</p>
        </div>
      </div>
    </div>
  );
}
