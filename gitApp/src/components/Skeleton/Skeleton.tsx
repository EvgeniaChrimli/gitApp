import ContentLoader from "react-content-loader";
import type { IContentLoaderProps } from "react-content-loader";

const Skeleton: React.FC<IContentLoaderProps> = (props) => (
  <ContentLoader
    speed={2}
    width={300}
    height={281}
    viewBox="0 0 400 350"
    backgroundColor="#dbdbdb"
    foregroundColor="#ffffff"
    {...props}
  >
    <rect x="15" y="40" rx="0" ry="0" width="236" height="284" />
    <rect x="36" y="275" rx="0" ry="0" width="128" height="25" />
    <rect x="121" y="343" rx="0" ry="0" width="1" height="1" />
  </ContentLoader>
);

export default Skeleton;
