    // 示例：
    // const data = {
    //  title: ['姓名', '手机号', '邮箱'],
    //  data: [{
    //          name: '路人甲',
    //          phone: '123456',
    //          email: '123@123456.com'
    //      },
    //      {
    //          name: '炮灰乙',
    //          phone: '123456',
    //          email: '123@123456.com'
    //      },
    //  ]
    // }
    (function () {
        let exportExcel = function (params) {
            this.data = params.data;
            this.wsnames = params.wsnames;
            this.wbname = params.wbname;
            this.appname = params.appname;
            this.uri = 'data:application/vnd.ms-excel;base64,';
            this.tmplWorkbookXML =
                '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">' +
                '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author>Axel Richter</Author><Created>{created}</Created></DocumentProperties>' +
                '<Styles>' +
                '<Style ss:ID="Currency"><NumberFormat ss:Format="Currency"></NumberFormat></Style>' +
                '<Style ss:ID="Date"><NumberFormat ss:Format="Medium Date"></NumberFormat></Style>' +
                '<Style ss:ID="center"><Alignment ss:Horizontal="Center" ss:Vertical="Center"/><Font ss:FontName="宋体" x:CharSet="134" ss:Size="12" ss:Bold="1" /></Style>' +
                '</Styles>' +
                '{worksheets}</Workbook>';
            this.tmplWorksheetXML = '<Worksheet ss:Name="{nameWS}"><Table>{rows}</Table></Worksheet>';
            this.tmplCellXML =
                '<Cell{attributeStyleID}{attributeFormula}{mergeAcross}><Data ss:Type="{nameType}">{data}</Data></Cell>';
            this.base64 = function (s) {
                return window.btoa(unescape(encodeURIComponent(s)))
            };
            this.format = function (s, c) {
                return s.replace(/{(\\w+)}/g, function (m, p) {
                    return c\[p\];
                })
            }
            return this.handler();
        }
        exportExcel.prototype.handler = function () {
            var ctx = "";
            var workbookXML = "";
            var worksheetsXML = "";
            var rowsXML = ' ';
            let header = this.data.header;
    
            let titleArr = this.data.title;
            let arr = this.data.data;
            let rowsTil = '<Row ss:Height="30">';
            let htx = this.getCtx(header, titleArr.length, 'center');
            rowsTil += this.format(this.tmplCellXML, htx);
            rowsTil += '</Row>';
            rowsXML += rowsTil;
            let rowsTbTil = '<Row>';
            for (let j = 0; j < titleArr.length; j++) {
                const ele = titleArr\[j\];
                ttx = this.getCtx(ele);
                rowsTbTil += this.format(this.tmplCellXML, ttx);
                console.log(rowsXML);
                console.log(ttx);
            }
    
            rowsTbTil += '</Row>';
            rowsXML += rowsTbTil;
            for (var k = 0; k < arr.length; k++) {
                rowsXML += '<Row>';
                for (const key in arr\[k\]) {
                    var eleb = arr\[k\]\[key\];
                    ctx = this.getCtx(eleb);
                    rowsXML += this.format(this.tmplCellXML, ctx);
                    console.log(rowsXML);
                    console.log(ctx);
                }
                rowsXML += '</Row>'
            }
    
            ctx = {
                rows: rowsXML,
                nameWS: this.wsnames || 'Sheet' + 0
            };
            worksheetsXML += this.format(this.tmplWorksheetXML, ctx);
            rowsXML = "";
            ctx = {
                created: (new Date()).getTime(),
                worksheets: worksheetsXML
            };
            workbookXML = this.format(this.tmplWorkbookXML, ctx);
            //          查看后台的打印输出
            console.log(workbookXML);
            var link = document.createElement("A");
            link.href = this.uri + this.base64(workbookXML);
            link.download = this.wbname || 'Workbook.xls';
            link.target = '\_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    
        exportExcel.prototype.getCtx = function (value, colspan, center) {
            //可根据不同的参数设置导出excel的样式等
            var dataType = value.type;
            var dataStyle = value.style || center;
            var dataValue = value.value;
            dataValue = (dataValue) ? dataValue : value;
            var dataFormula = value.formula;
            dataFormula = (dataFormula) ? dataFormula : (this.appname == 'Calc' && dataType ==
                'DateTime') ? dataValue : null;
            let tx = {
                attributeStyleID: (dataStyle == 'Currency' || dataStyle == 'Date' || dataStyle == 'center') ?' ss:StyleID="' + dataStyle + '"' : '',
                nameType: (dataType == 'Number' || dataType == 'DateTime' || dataType ==
                    'Boolean' || dataType == 'Error') ? dataType : 'String',
                data: (dataFormula) ? '' : dataValue,
                attributeFormula: (dataFormula) ? ' ss:Formula="' + dataFormula + '"' : '',
                mergeAcross: colspan ? ' ss:MergeAcross="' + colspan + '"' : ''
            };
    
            return tx;
        }
        this.exportExcel = exportExcel;
    
    })();
    