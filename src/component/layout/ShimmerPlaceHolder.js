import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const Shimmer = createShimmerPlaceholder(LinearGradient);

const ShimmerPlaceHolder = ({shimmerStyle}) => {
    const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];
    return (
        <Shimmer
            shimmerColors={colorLoader}
            shimmerStyle={shimmerStyle} />
    )
}

export default ShimmerPlaceHolder;