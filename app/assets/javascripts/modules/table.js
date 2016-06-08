export default class Table {
  constructor(args) {
    this.$table = args.$table;
    this.store =  {
      page: 1,
      filters: args.filters,
      limit: args.limit,
      rows: []
    };

    // create initial store
    this.$table.find('tbody tr').each((idx, el) => {
      let data = {
        id: $(el).data('id'),
        show: true
      };
      // set filters
      let filters = this.store.filters;
      for(let i = 0; i < filters.length; i++) {
        /**
        * 引数で渡されたfiltersのdata-hogeを持つ要素を探して
        * {
        *   id: 0,
        *   show: true,
        *   data-hoge: value
        * }
        * みたいな感じで設定する
        */
        data[filters[i]] = $(el).find('['+ filters[i] +']').attr(filters[i]);
      }
      this.store.rows.push(data);
    });

    // initial render
    this.render();
  }

  render() {
    let rows = this.store.rows;
    let showNum = 0; // 表示した件数

    // update table
    for(let i = 0; i < rows.length; i++) {
      let $tr = this.$table.find('tbody tr[data-id="'+rows[i].id+'"]');
      if(rows[i].show && showNum <= this.store.limit-1) {
        showNum++;
        $tr.show();
      } else {
        $tr.hide();
      }
    }

    // update pager

  }

  filter(text) {
    let rows = this.store.rows;
    let filters = this.store.filters;

    for(let i = 0; i < rows.length; i++) {
      for(let j = 0; j < filters.length; j++) {
        let re = new RegExp(text, 'i');
        if(rows[i][filters[j]].match(re)) {
          rows[i].show = true;
        } else {
          rows[i].show = false;
        }
      }
    }
    this.render();
  }

  sort() {

  }

  add() {

  }
}