interface AssetLoaderConfig {
  name: string;
  extension: string;
  subDir?: string;
}

interface SpritesLoaderConfig extends AssetLoaderConfig {
  filenames: string[];
}

interface SpriteLoaderConfig extends AssetLoaderConfig {
  filename: string;
}

export class AssetsManager {
  private basePath: string;
  private staticStore!: Record<string, CanvasImageSource>;
  private animatedStore!: Record<string, CanvasImageSource[]>;

  constructor(basePath: string) {
    this.basePath = basePath;
    this.staticStore = {};
    this.animatedStore = {};
  }

  loadSprites(
    sprites: SpritesLoaderConfig
  ): void {
    const imgs: CanvasImageSource[] = [];

    for (let i = 0; i < sprites.filenames.length; i++) {
      const img = new Image();
      img.src = this.filePath(sprites.filenames[i], sprites.extension, sprites.subDir);
      imgs.push(img);
    }

    this.addToAnimatedStore(imgs, sprites.name);
  }

  loadSprite(sprite: SpriteLoaderConfig): void {
    const img = new Image();
    img.src = this.filePath(sprite.filename, sprite.extension, sprite.subDir);

    this.addToStaticStore(img, sprite.name);
  }

  getStaticSprite(name: string): CanvasImageSource {
    return this.staticStore[name]
  }

  getAnimatedSprites(name: string): CanvasImageSource[] {
    return this.animatedStore[name];
  }

  private addToStaticStore(img: CanvasImageSource, name: string): void {
    this.staticStore[name] = img;
  }

  private addToAnimatedStore(imgs: CanvasImageSource[], name: string): void {
    this.animatedStore[name] = imgs;
  }

  private filePath(
    filename: string,
    extension: string,
    subDir?: string,
  ): string {
    return `${this.basePath}/${subDir ? subDir + '/' : ''}${filename}.${extension}`;
  }
}