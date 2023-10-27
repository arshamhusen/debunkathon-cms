import { useDynamicSvgImport } from "@/hooks/useDynamicSvgImport";
import { cn } from "@/lib/utils";

interface IconProps {
  name: string;
  style?: string;
  className?: string;
  svgProp?: React.SVGProps<SVGSVGElement>;
}

export default function Icon(props: IconProps) {
  const { name: iconName, style: wrapperStyle, svgProp } = props;
  const { loading, SvgIcon } = useDynamicSvgImport(iconName);

  return (
    <>
      {loading && (
        <div
          className={cn(props.className, "rounded-full  animate-pulse h-8 w-8")}
        ></div>
      )}
      {SvgIcon && (
        <div className={wrapperStyle}>
          <SvgIcon {...(svgProp ?? { width: 24, height: 24 })} />
        </div>
      )}
    </>
  );
}
