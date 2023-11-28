function TurnOnSortyear()
{
Sort++;
if(Sort == 1)
{
  document.getElementById("SortButton").classList.remove('btn','btn-info');
  document.getElementById("SortButton").classList.add('btn','btn-success');
}
if(Sort == 2)
{
  document.getElementById("SortButton").classList.add('btn','btn-danger');
  document.getElementById("SortButton").classList.remove('btn','btn-success');
}
if(Sort == 3){
  document.getElementById("SortButton").classList.add('btn','btn-info');
  document.getElementById("SortButton").classList.remove('btn','btn-danger');
  Sort = 0;
}
}


