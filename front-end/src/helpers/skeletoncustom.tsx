import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

function SkeletonCustom() {
    return(
        <Box padding='6' boxShadow='lg'>
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' />
        </Box>
    )
}

export default SkeletonCustom;