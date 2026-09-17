export type ResponsiveImageAsset = {
  webpSrcSet: string;
  src: string;
  width: number;
  height: number;
  sizes: string;
};

type Props = ResponsiveImageAsset & {
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  decoding?: "async" | "auto" | "sync";
};

export function ResponsiveImage({
  webpSrcSet,
  src,
  width,
  height,
  sizes,
  alt,
  className,
  imgClassName,
  loading = "lazy",
  fetchPriority,
  decoding = "async",
}: Props) {
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
        className={imgClassName}
      />
    </picture>
  );
}
