import { useState, useMemo } from "react";
import { colors } from "@ff6347/named-css-colors";
import { LucideCopy } from "./Icon";

const ColorList = () => {
	const [copiedColor, setCopiedColor] = useState<string | null>(null);
	const [filter, setFilter] = useState("");

	const filteredColors = useMemo(() => {
		return colors.items.filter((color) =>
			color.name.toLowerCase().includes(filter.toLowerCase()),
		);
	}, [filter]);

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
				<div
					id="color-items-container"
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
						gap: "10px",
					}}
				>
					{filteredColors.map((color) => {
						const [h, s, l] = color.hsl;
						const isDark = l < 50;
						const iconColor = isDark ? `hsl(0, 0%, 70%)` : `hsl(0, 0%, 30%)`;
						const buttonBgColor = isDark
							? `hsla(${h}, ${s}%, ${l + 10}%, 0.3)`
							: `hsla(${h}, ${s}%, ${l - 10}%, 0.3)`;

						return (
							<figure
								key={color.title}
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
										onClick={() => copyToClipboard(color.name)}
										style={{
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
										}}
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
