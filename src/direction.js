'use strict';

module.exports = (tree, {
    markCoord,
    getChildren,
    widthGap = 0, heightUnit = 0
}) => {
    let calculate = (node, left = 0, top = 0) => {
        let width = 0,
            height = 0;
        let y = top;
        //
        let childs = getChildren(node);

        if (!childs || !childs.length) {
            width = widthGap;
            height = 0;
        } else {
            let childHeight = 0;
            for (let i = 0; i < childs.length; i++) {
                let child = childs[i];
                let childSize = calculate(child, left + width, y + heightUnit);
                width += childSize.width;
                if (childSize.height > childHeight) {
                    childHeight = childSize.height;
                }
            }

            height = heightUnit + childHeight;
        }

        markCoord && markCoord(node, {
            x: left + width / 2,
            y
        });

        return {
            width, height
        };
    };

    return calculate(tree);
};
