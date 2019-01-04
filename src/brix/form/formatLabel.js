export const formatLabel = (label, optional = false) => {
  return optional ? `${label} (optional)` : label
}