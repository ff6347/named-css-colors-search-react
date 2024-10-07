import { useState, useMemo, type CSSProperties } from "react";
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
	const iconColor = isDark ? `hsl(0, 0%, 70%)` : `hsl(0, 0%, 30%)`;
	const buttonBgColor = isDark
		? `hsla(${h}, ${s}%, ${l + 10}%, 0.3)`
		: `hsla(${h}, ${s}%, ${l - 10}%, 0.3)`;

	const copyButtonStyle: CSSProperties = {
		position: "absolute",
		top: "5px",
		right: "5px",
		background: buttonBgColor,
		border: "none",
		borderRadius: "5px",
		width: "30px",
		height: "30px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		cursor: "pointer",
	};
	const favoriteButtonStyle: CSSProperties = {
		...copyButtonStyle,
		top: "5px",
		left: "5px",
	};

	return (
		<figure
			key={color.name}
			style={{
				margin: 0,
				textAlign: "center",
				width: "100%",
				position: "relative",
				border: "1px solid hsl(0, 0%, 80%)",
				borderRadius: "10px",
				overflow: "hidden",
			}}
		>
			<div
				id="color-item"
				style={{
					width: "100%",
					paddingBottom: "100%",
					backgroundColor: color.name,
					position: "relative",
				}}
			>
				<button
					onClick={() => toggleFavorite(color.name)}
					style={favoriteButtonStyle}
				>
					{isFavorite ? (
						<LucideHeartCrack
							style={{
								width: "18px",
								height: "18px",
								color: iconColor,
							}}
						/>
					) : (
						<LucideHeart
							style={{
								width: "18px",
								height: "18px",
								color: iconColor,
							}}
						/>
					)}
				</button>
				<button
					onClick={() => copyToClipboard(color.name)}
					style={copyButtonStyle}
				>
					<LucideCopy
						style={{
							width: "18px",
							height: "18px",
							color: iconColor,
						}}
					/>
				</button>
			</div>
			<figcaption
				style={{
					padding: "5px",
					backgroundColor: "hsla(0, 0%, 100%, 0.8)",
					color: "hsl(0, 0%, 20%)",
				}}
			>
				{color.name}
			</figcaption>
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
			<div id="color-list" style={{ display: "grid", gap: "20px" }}>
				{favoriteColors.length !== 0 && <h2>Favorites</h2>}
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
						gap: "10px",
					}}
				>
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
					style={{
						padding: "10px",
						boxSizing: "border-box",
					}}
				/>
				<h2>All Colors</h2>
				<div
					id="color-items-container"
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
						gap: "10px",
					}}
				>
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
				<div
					style={{
						position: "fixed",
						bottom: "20px",
						left: "50%",
						transform: "translateX(-50%)",
						backgroundColor: "hsla(0, 0%, 0%, 0.7)",
						color: "hsl(0, 0%, 100%)",
						padding: "10px 20px",
						borderRadius: "5px",
						zIndex: 1000,
					}}
				>
					Copied: {copiedColor}
				</div>
			)}
		</div>
	);
};

export default ColorList;
