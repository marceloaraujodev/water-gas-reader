declare module 'is-base64' {
  const isBase64: (value: string, opts?: { allowMime?: boolean }) => boolean;
  export default isBase64;
}