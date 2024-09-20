import styled from 'styled-components';

interface BlockProps {
  width: number;  // width percentage relative to the container
  height: number; // height percentage relative to the container
  color: string;  // background color for visualization
}

const TreemapContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 400px; /* Define the height of the treemap */
  position: relative;
`;

const Block = styled.div<BlockProps>`
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}%;
  background-color: ${(props) => props.color};
  box-sizing: border-box;
  border: 2px solid #fff; /* Optional: Visualize the block separation */
  position: absolute;
`;

interface BlockPosition {
  top: number;
  left: number;
}

const calculateBlockPosition = (blocks: BlockProps[]) => {
  const positions: BlockPosition[] = [];
  let currentTop = 0;
  let currentLeft = 0;
  let maxHeightInRow = 0;

  blocks.forEach((block) => {
    if (currentLeft + block.width > 100) {
      currentTop += maxHeightInRow;
      currentLeft = 0;
      maxHeightInRow = 0;
    }

    positions.push({ top: currentTop, left: currentLeft });

    currentLeft += block.width;
    maxHeightInRow = Math.max(maxHeightInRow, block.height);
  });

  return positions;
};

const TreemapGraph = ({ blocks }: { blocks: BlockProps[] }) => {
  const positions = calculateBlockPosition(blocks);

  return (
    <TreemapContainer>
      {blocks.map((block, index) => (
        <Block
          key={index}
          width={block.width}
          height={block.height}
          color={block.color}
          style={{
            top: `${positions[index].top}%`,
            left: `${positions[index].left}%`,
          }}
        />
      ))}
    </TreemapContainer>
  );
};

export default TreemapGraph;