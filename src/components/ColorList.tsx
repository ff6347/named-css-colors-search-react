import "../css/color-list.css";
import { useState, useMemo } from "react";
import { colors } from "@ff6347/named-css-colors";
import type { ColorItem } from "@ff6347/named-css-colors";
import { LucideCopy } from "./IconCopy";
import { useLocalStorage } from "./use-local-storage";
import { LucideHeartCrack } from "./IconHeartCrack";
import { LucideHeart } from "./IconHeart";

const ColorCard = ({
	color,
	copyToClipboard,
	isFavorite,
	toggleFavorite,
}: {
	color: ColorItem;
	copyToClipboard: (colorArg: string) => void;
	isFavorite: boolean;
	toggleFavorite: (colorArg: string) => void;
}) => {
	const [h, s, l] = color.hsl;
	const isDark = l < 50;
	const buttonBgColor = isDark
		? `hsla(${h}, ${s}%, ${l + 10}%, 0.3)`
		: `hsla(${h}, ${s}%, ${l - 10}%, 0.3)`;


	return (
		<figure key={color.name} className="color-card">
			<div
				id="color-item"
				className="color-item"
				style={{ backgroundColor: color.name }}
			>
				<button
					onClick={() => toggleFavorite(color.name)}
					className="favorite-button"
					style={{ background: buttonBgColor }}
				>
					{isFavorite ? (
						<LucideHeartCrack
							className={`icons ${isDark ? "icon-is-dark" : "icon-is-light"}`}
						/>
					) : (
						<LucideHeart
							className={`icons ${isDark ? "icon-is-dark" : "icon-is-light"}`}
						/>
					)}
				</button>
				<button
					onClick={() => copyToClipboard(color.name)}
					className="copy-button"
					style={{ background: buttonBgColor }}
				>
					<LucideCopy
						className={`icons ${isDark ? "icon-is-dark" : "icon-is-light"}`}
					/>
				</button>
			</div>
			<figcaption className="figcaption">{color.name}</figcaption>
		</figure>
	);
};

const ColorList = () => {
	const [copiedColor, setCopiedColor] = useState<string | null>(null);
	const [filter, setFilter] = useState("");

	const [favorites, setFavorites] = useLocalStorage(
		"color-names-favorites",
		[],
	);

	const favoriteColors = useMemo(() => {
		return colors.items.filter((color) => favorites.includes(color.name));
	}, [favorites]);

	const filteredColors = useMemo(() => {
		return colors.items.filter((color) =>
			color.name.toLowerCase().includes(filter.toLowerCase()),
		);
	}, [filter]);

	const toggleFavorite = (colorArg: string) => {
		setFavorites((prevFavorites: string[]) => {
			const isFavorite = prevFavorites.includes(colorArg);
			if (isFavorite) {
				return prevFavorites.filter((name) => name !== colorArg);
			} else {
				return [...prevFavorites, colorArg];
			}
		});
	};
	const copyToClipboard = (colorArg: string) => {
		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(colorArg).then(() => {
				setCopiedColor(colorArg);
				setTimeout(() => setCopiedColor(null), 2000);
			});
		} else {
			// Fallback method
			const textArea = document.createElement("textarea");
			textArea.value = colorArg;
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();
			try {
				document.execCommand("copy");
				setCopiedColor(colorArg);
				setTimeout(() => setCopiedColor(null), 2000);
			} catch (err) {
				console.error("Failed to copy: ", err);
			}
			document.body.removeChild(textArea);
		}
	};

	return (
		<div style={{ position: "relative" }}>
			<div id="color-list" className="color-list">
				{favoriteColors.length !== 0 && <h2>Favorites</h2>}
				<div className="color-items-container">
					{favoriteColors.map((color) => {
						return (
							<ColorCard
								isFavorite={true}
								key={color.name}
								color={color}
								toggleFavorite={toggleFavorite}
								copyToClipboard={copyToClipboard}
							/>
						);
					})}
				</div>
				<input
					type="text"
					placeholder="Filter colors..."
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					className="filter-input"
				/>
				<h2>All Colors</h2>
				<div id="color-items-container" className="color-items-container">
					{filteredColors.map((color) => {
						return (
							<ColorCard
								isFavorite={false}
								key={color.name}
								color={color}
								copyToClipboard={copyToClipboard}
								toggleFavorite={toggleFavorite}
							/>
						);
					})}
				</div>
			</div>
			{copiedColor && (
				<div className="copied-notification">Copied: {copiedColor}</div>
			)}
		</div>
	);
};

export default ColorList;
