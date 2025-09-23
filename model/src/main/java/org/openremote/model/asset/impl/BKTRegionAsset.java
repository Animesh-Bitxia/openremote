/*
 * Copyright 2024, BKT Tyres
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
package org.openremote.model.asset.impl;

import org.openremote.model.asset.Asset;
import org.openremote.model.asset.AssetDescriptor;

import jakarta.persistence.Entity;

/**
 * BKT Region asset representing geographical regions or zones
 */
@Entity
public class BKTRegionAsset extends Asset<BKTRegionAsset> {

    public static final AssetDescriptor<BKTRegionAsset> DESCRIPTOR = new AssetDescriptor<>("map-marker-radius", "9C27B0", BKTRegionAsset.class);

    /**
     * For use by hydrators (i.e. JPA/Jackson)
     */
    protected BKTRegionAsset() {
    }

    public BKTRegionAsset(String name) {
        super(name);
    }
}
