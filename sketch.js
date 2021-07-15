let time = 0;
let wave = [];
let slider;
let nDisplay;

function setup()
{
  createCanvas(windowWidth, windowHeight);
  slider = createSlider(1, 50, 1).center();
  slider.position ((width / 2) - 200, 450);
  slider.size(300, 20);
}

function draw()
{
  background('#171717');
  translate(300, 200);

  let x = 0;
  let y = 0;
  for (let i = 0; i < slider.value(); i++)
  {
    let prevx = x;
    let prevy = y;

    let n = i * 2 + 1;
    let radius = 100 * (4 / (n * PI));
    x += radius * cos(n * time); //Formula taken from wikipedia page on fourier series
    y += radius * sin(n * time); //Formula taken from wikipedia page on fourier series

    stroke (255, 100);
    noFill();
    ellipse (prevx, prevy, radius * 2);

    stroke ('#EDEDED');
    line (prevx, prevy, x, y); //Radius of circle 

  }
  wave.unshift(y); // unshift used instead of push because unshift pushes numbers from opposite end
  translate (200, 0); 
  stroke('#DA0037'); //Red color to line
  line (x - 200, y, 0, wave[0]); //Point on circumference to wave

  //Graph Plotting
  beginShape();
  noFill();
  for(let i = 0; i< wave.length; i++)
  {
    vertex (i, wave[i]);
  }
  endShape();

  point(x, y);
  time += 0.05;

  //Text 'Value of n:'
  fill('#DA0037');
  textSize(20);
  text('Value of n: ' + slider.value(), 220, 330);

  slider.position ((width / 2) - 150, 550);

  //Free up array after the point is out of screen
  if(wave.length > 1200)
  {
    wave.pop();
  }
}
