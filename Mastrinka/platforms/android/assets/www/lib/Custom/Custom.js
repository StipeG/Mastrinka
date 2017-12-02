function Manifestations()
{
    this.id = -1;
    this.name = "";
}
function Tables()
{
    this.id = -1;
    this.name = "";
    this.manifestation = new Manifestations();
}
function Samples()
{
    this.id = -1;
    this.name = "";
    this.table = new Tables();
}

function PopulateForTestTables()
{
    var manifest = [];
    var tab = [];
    var sam = [];

    var tabId = 1;
    var samId = 1;
    for (var i = 0; i < 2; i++)
    {
        var m = new Manifestations();
        m.id = i + 1;
        m.name = "M: " + (i + 1);
        for (var j = i; j < i + 4; j++)
        {
            var t = new Tables();
            t.id = tabId++;
            t.name = "T: " + (t.id);
            t.manifestation = m;
            for (var k = j; k < j + 5; k++)
            {
                var s = new Samples();
                s.id = samId++;
                s.name = "S: " + (samId);
                s.table = t;
                sam.push(s);
            }
            tab.push(t);
        }
        manifest.push(m);
    }
     return { manifest: manifest, tables: tab, samples: sam };
}
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
              ? args[number]
              : match
            ;
        });
    };
}