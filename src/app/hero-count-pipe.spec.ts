import { HeroCountPipe } from './hero-count-pipe';

describe('HeroCountPipe', () => {
  it('create an instance', () => {
    const pipe = new HeroCountPipe();
    expect(pipe).toBeTruthy();
  });
});
