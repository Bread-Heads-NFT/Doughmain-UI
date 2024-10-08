'use client';
import React, { useEffect } from 'react'
import Phaser from 'phaser';
import { Boot } from '@/scenes/Boot';
import { Preloader } from '@/scenes/Preloader';
import { MainMenu } from '@/scenes/MainMenu';
import { GameOver } from '@/scenes/GameOver';
import { Game as MainGame } from '@/scenes/Game';
import { Hud } from '@/scenes/Hud';

export const DEFAULT_WIDTH: number = 640
export const DEFAULT_HEIGHT: number = 480

const Game = () => {
    useEffect(() => {
        const config: Phaser.Types.Core.GameConfig = {
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT,
            type: Phaser.AUTO,
            scene: [
                Boot,
                Preloader,
                MainMenu,
                MainGame,
                GameOver,
                Hud,
            ],
            render: {
                pixelArt: true,
            },
            scale: {
                mode: Phaser.Scale.FIT,
                autoRound: true,
            },
            pixelArt: true,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { x: 0, y: 300 },
                    debug: true,
                }
            }

        };
        const game = new Phaser.Game(config)
        return () => {
            game.destroy(true)
        }
    }, [])
    return (
        <div>

        </div>
    )
}


export default Game;