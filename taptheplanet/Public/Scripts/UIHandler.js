// -----JS CODE-----
//@input Component.Text Text

//methods
function SetText(message)
{
    script.Text.text=message;
}

function EnableText(enabled)
{
    script.Text.enabled=enabled;
}

//api methods

script.api.SendMessage=SetText;
script.api.EnableText=EnableText;