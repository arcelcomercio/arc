export type Preset = {
  width: number
  height: number
}
export type Presets = Record<string, Preset>
export type InlinePresets = Presets | string
export type ResizedUrls = Record<string, string>
