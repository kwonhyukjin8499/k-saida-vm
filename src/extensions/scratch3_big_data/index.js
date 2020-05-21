const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const formatMessage = require('format-message');

const blockIconURI = 'data:image/png;base64,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';

class Scratch3BigDataBlocks {

  static get EXTESNION_NAME() {
    return 'BigData';
  }

  static get EXTENSION_ID() {
    return 'bigData';
  }

  constructor(runtime) {
    this.runtime = runtime;
  }

  getInfo() {
    return {
      id: Scratch3BigDataBlocks.EXTENSION_ID,
      name: Scratch3BigDataBlocks.EXTESNION_NAME,
      blockIconURI: blockIconURI,
      showStatusButton: false,
      name: formatMessage({
        id: 'bigData.categoryName',
        default: 'Big Data',
        description: 'Label for the Big Data extension category'
      }),
      blocks: [
        {
          opcode: 'loadCSV',
          blockType: BlockType.COMMAND,
          text: formatMessage({
            id: 'bigData.loadCSV',
            default: 'load csv file [FILE]',
            description: 'load your csv file'
          }),
          arguments:{
            FILE: {
              type: ArgumentType.STRING,
              defaultValue: '*.csv'
            }
          }
        }
      ],
      menus: {

      }
    };
  }

  // function for load csv file block
  loadCSV(args, util) {
    try{
      // create and set input tag for load csv file
      var file = document.createElement("input");
      file.type = "file";
      file.accept = ".csv";

      file.onchange = function (event) {
          // show file name in console
          console.log(event.target.files[0].name);
          // create file readder
          var reader = new FileReader();
          // show file content in console
          reader.onload = function () {
            console.log(reader.result);
          };
          // read csv file
          reader.readAsText(event.target.files[0], /* optional */ "euc-kr");
      };

      // when 'load csv file' block is clicked, make input tag clicked for work 
      file.click();
    } catch(e){
      alert(e);
    }
  }

}

module.exports = Scratch3BigDataBlocks; 