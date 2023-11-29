function TurnOnSortyear()
{
Sort++;
if(Sort == 1)
{
  document.getElementById("SortButton").classList.remove('btn','btn-warning');
  document.getElementById("SortButton").classList.add('btn','btn-success');
}
if(Sort == 2)
{
  document.getElementById("SortButton").classList.add('btn','btn-danger');
  document.getElementById("SortButton").classList.remove('btn','btn-success');
}
if(Sort == 3){
  document.getElementById("SortButton").classList.add('btn','btn-warning');
  document.getElementById("SortButton").classList.remove('btn','btn-danger');
  Sort = 0;
}
}
let counter = 0;
function dropgatunki()
{
  counter++;
  if(counter==1)
  {
  document.getElementById("tags").classList.add('dropped');
  document.getElementById("tags").classList.remove('undropped');
  }
  else if(counter==2)
  {
    document.getElementById("tags").classList.remove('dropped');
    document.getElementById("tags").classList.add('undropped');
  }
  else if(counter==3)
  {
    document.getElementById("tags").classList.add('dropped');
    document.getElementById("tags").classList.remove('undropped');
    counter = 1;
  }
}

