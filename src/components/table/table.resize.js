import { $ } from '@core/dom';

export function resizeHandler($root, evt) {
  return new Promise(resolve => {
    const $resizer = $(evt.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    let value;

    document.onmousemove = e => {
      if (type === 'col') {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({
          right: -delta + 'px'
        });
      } else {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({
          bottom: -delta + 'px'
        });
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      if (type === 'col') {
        $parent.css({
          width: value + 'px',
        });
        $root
            .findAll(`[data-col="${$parent.data.col}"]`).forEach(cell => {
              cell.style.width = value + 'px';
            });
        $resizer.css({
          bottom: 0,
          right: 0
        });
      } else {
        $parent.css({
          height: value + 'px'
        });
      }

      resolve({
        value,
        type,
        id: $parent.data[type]
      });

      $resizer.css({
        bottom: 0
      });
    };
  });
}
